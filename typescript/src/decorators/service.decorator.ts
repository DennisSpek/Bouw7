import { Container } from '../container';

export function Service(options?: ServiceOptions) {
  return function (constructor: Constructor) {
    console.log('Service decorator called', constructor);
    Container.register([{ module: constructor, options }]);
  };
}
