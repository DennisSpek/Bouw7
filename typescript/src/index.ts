import { Container } from './container';
import { Logger } from './services/log.service';
import { Service } from './decorators/service.decorator';
import { ServiceA } from './services/serviceA.service';
import { ServiceB } from './services/serviceB.service';

Container.register([{ module: Logger }]);

(async () => {
  const container = await Container.compile();
  container.get(ServiceB).doSomething();
})();

//await container.compile();
// Expected output:
// > ServiceA created
// > ServiceB created

//container.get(ServiceB).doSomething();
// Expected output:
// > ServiceB doing something
// > ServiceA doing something
