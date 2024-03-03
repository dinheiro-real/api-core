import express, { Express, Router } from 'express';
import { Routes } from '../routes/routes';
import { DatabaseConfigurator } from './dbConfigurator';
import { AccessControl } from '../security/accessControl';
import { RouterHandler } from '../security/routerHandler';
import { ControllerGroup, Controllers } from '../controllers/controllers';
import { Pool } from 'pg';

export class HttpServer {
    private app: Express;
    private router: Router;

    constructor(private serverPort: number) {
        this.app = express();
        this.app.use(express.json());
        this.router = Router();
    }

    public async initialize() {
        const database = await this.setupDatabase();
        const controllers = this.setupControllers(database);
        this.setupRoutes(controllers);

        this.app.listen(this.serverPort, () => {
            console.log(`Server is running at http://localhost:${this.serverPort}`);
        });
    }

    private setupRoutes(controllers: ControllerGroup): void {
        const accessControl = new AccessControl();
        const routerHandler = new RouterHandler(this.router, controllers, accessControl);

        const configurator = new Routes(routerHandler);

        this.app.use(configurator.setup());
    }

    private async setupDatabase(): Promise<Pool> {
        const databaseConfigurator = new DatabaseConfigurator();
        await databaseConfigurator.testConnection();
        const database = databaseConfigurator.getPool();
        return database;
    }

    private setupControllers(database: Pool): ControllerGroup {
        const controllers = new Controllers(database).setup();

        return controllers;
    }
}