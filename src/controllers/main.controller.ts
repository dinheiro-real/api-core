import { Request, Response } from 'express';

import { HealthCommand } from '../application-services/use-cases/health.command';

export class MainController {
    constructor(options: any) { }

    public healthAction(req: Request, res: Response) {
        const result = new HealthCommand().execute();

        return res.status(200).send(result);
    }
}