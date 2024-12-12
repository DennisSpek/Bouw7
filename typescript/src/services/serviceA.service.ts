import { Service } from '../decorators/service.decorator';

@Service({
  // Factory function to create the service asynchronously.
  factory: async (constructorArguments: [any]) => {
    return new ServiceA(...constructorArguments);
  },
})
export class ServiceA {
  constructor(private logger: Logger) {
    this.logger.log('ServiceA created');
  }

  public doSomething() {
    this.logger.log('ServiceA doing something');
  }
}
