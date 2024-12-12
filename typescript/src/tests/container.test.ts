import { Container } from '../container';

class ServiceA {}
class ServiceB {
  constructor(public serviceA: ServiceA) {}
}

describe('Container', () => {
  beforeEach(() => {
    // Reset the container before each test
    (Container as any).services = [];
    (Container as any).instances = [];
  });

  it('should register services', () => {
    Container.register([{ module: ServiceA }]);
    expect((Container as any).services.length).toBe(1);
  });

  it('should compile services without dependencies', () => {
    Container.register([{ module: ServiceA }]);
    Container.compile();
    const instance = (Container as any).instances.find(
      (instance: any) => instance instanceof ServiceA
    );
    expect(instance).toBeInstanceOf(ServiceA);
  });
});
