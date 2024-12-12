// | 15     | Services should be (optionally) resolvable with an `@Inject` decorator on properties.          |

import 'reflect-metadata';

interface Service {
  module: Constructor;
  options?: ServiceOptions;
}

export class Container {
  private static services: Service[] = [];
  private static instances: any[] = [];

  public static register(modules: Service[]): void {
    modules.forEach((module) => {
      Container.services.push(module);
    });
  }

  public static compile(): Container {
    const resolving = new Set<Service>();

    for (const service of Container.services) {
      const { module, options } = service;

      if (resolving.has(service)) {
        throw new Error(`Circular dependency detected: ${module.name}`);
      }

      resolving.add(service);

      const dependencies = Container.resolveDependencies(module);

      const instance = new module(...dependencies);

      if (!instance) {
        throw new Error(`Service ${module.name} not created`);
      }

      Container.instances.push(instance);
      resolving.delete(service);
    }

    return new Container();
  }

  public get(service: Constructor): any {
    const registeredService = Container.services.find(
      (s) => s.module === service
    );
    if (!registeredService) {
      throw new Error(`Service ${service.name} not registered`);
    }

    if (registeredService.options?.transient) {
      const dependencies = Container.resolveDependencies(service);

      return new service(...dependencies);
    }

    return Container.instances.find((s) => s instanceof service);
  }

  private static resolveDependencies(module: Constructor): Constructor[] {
    const paramTypes = Reflect.getMetadata('design:paramtypes', module) ?? [];
    return paramTypes.map((param: Constructor) => {
      const instance = Container.instances.find(
        (instance) => instance instanceof param
      );

      if (!instance) {
        throw new Error(
          `Dependency ${param.name} for ${module.name} not found`
        );
      }

      return instance;
    });
  }
}
