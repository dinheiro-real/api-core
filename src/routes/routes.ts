import { Router } from 'express';

import { addMainRoutes } from './addMainRoutes';
import { RouterHandler } from '../security/routerHandler';

export class Routes {

    constructor(private routerHandler: RouterHandler) { }

    public setup(): Router {
        addMainRoutes(this.routerHandler);

        const router = this.routerHandler.getRouter();
        return router;
    }
}