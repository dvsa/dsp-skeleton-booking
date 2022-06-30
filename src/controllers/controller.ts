import { Application } from 'express';

export interface Controller {
  attachRoutes: (app: Application) => void
}
