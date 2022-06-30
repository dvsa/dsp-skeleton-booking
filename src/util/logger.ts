import { injectable } from 'inversify';

@injectable()
export class Logger {
  public trace(msg: string): void {
    console.trace(msg);
  }

  public debug(msg: string): void {
    console.debug(msg);
  }

  public info(msg: string, obj?: any): void {
    console.info(msg, obj);
  }

  public warn(msg: string): void {
    console.warn(msg);
  }

  public error(msg: string): void {
    console.error(msg);
  }
}
