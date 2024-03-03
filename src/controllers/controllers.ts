import { NextFunction, Request, Response } from 'express';
import { PoolClient } from 'pg';

import { MainController } from './main.controller';

export interface ActionFunction {
  (req: Request, res: Response, next: NextFunction): void;
}

export interface Controller {
  [actionName: string]: ActionFunction | undefined;
}

export interface ControllerGroup {
  [controllerName: string]: Controller | undefined;
}

export class Controllers {
  constructor(private database: PoolClient) {}

  public setup(): ControllerGroup {
    return {
      MainController: this.mapToController(new MainController(this.database)),
    };
  }

  private mapToController(instance: any): Controller {
    const controller: Controller = {};

    Object.keys(instance).forEach((key) => {
      if (typeof instance[key] === 'function') {
        controller[key] = instance[key].bind(instance);
      }
    });

    let proto = Object.getPrototypeOf(instance);
    while (proto && proto !== Object.prototype) {
      Object.getOwnPropertyNames(proto).forEach((name) => {
        if (name !== 'constructor' && typeof instance[name] === 'function') {
          controller[name] = instance[name].bind(instance);
        }
      });
      proto = Object.getPrototypeOf(proto);
    }

    return controller;
  }
}
