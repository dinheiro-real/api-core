import { Router, Request, Response, NextFunction } from 'express';

import { AccessControl } from './accessControl';
import { HttpMethod } from '../constants/configs/enum';
import { ControllerGroup } from '../controllers/controllers';

export interface IRouterParams {
  path: string;
  method: HttpMethod;
  controllerName: string;
  actionName: string
  middlewares: ((req: Request, res: Response, next: NextFunction) => void)[];
}

export class RouterHandler {
  constructor(private router: Router, private controllers: ControllerGroup, private accessControl: AccessControl) { }

  public addRoute(params: IRouterParams): void {
    const { method, path, controllerName, actionName, middlewares } = params;

    const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
      this.accessControl.isAllowedRoute(req, res, next, params);
    }

    const controller = this.controllers[controllerName];
    if (!controller) {
      throw new Error('Controller not found')
    }

    const action = controller[actionName];
    if (!action) {
      throw new Error('Action not found')
    }

    this.router[method](path,
      ...middlewares,
      action,
    );
  }

  public getRouter(): Router {
    return this.router;
  }
}