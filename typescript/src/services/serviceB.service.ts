import { ServiceA } from './serviceA.service';
import { Service } from '../decorators/service.decorator';

@Service()
export class ServiceB {
  constructor(private logger: Logger, private serviceA: ServiceA) {
    this.logger.log('ServiceB created');
  }

  public doSomething() {
    this.logger.log('ServiceB doing something');

    return this.serviceA.doSomething();
  }
}
