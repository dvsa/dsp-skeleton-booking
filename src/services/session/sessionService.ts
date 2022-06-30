/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { injectable, unmanaged } from 'inversify';
import { Request } from 'express';

@injectable()
export abstract class SessionService<T> {
  public constructor(@unmanaged() private sessionKey: string) {}

  public get(req: Request, defaultValue?: T): T {
    return req.session[this.sessionKey] || defaultValue;
  }

  public set(req: Request, newValue: T): void {
    req.session[this.sessionKey] = newValue;
  }

  public delete(req: Request): void {
    delete req.session[this.sessionKey];
  }

  public update(req: Request, modify: (T) => T): void {
    req.session[this.sessionKey] = modify(req.session[this.sessionKey]);
  }
}
