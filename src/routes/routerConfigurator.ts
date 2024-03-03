import { Router } from 'express';
import { addMainRoutes } from './addMainRoutes';

export class RouterConfigurator {
    constructor(private router: Router) { }

    public setup() {
        addMainRoutes(this.router);

        return this.router;
    }
}