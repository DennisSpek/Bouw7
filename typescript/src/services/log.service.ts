import { Service } from '../decorators/service.decorator';

@Service()
export class Logger {
  public log(message: string) {
    console.log(message);
  }
}
