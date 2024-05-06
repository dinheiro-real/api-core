import express, { Express, Router } from 'express';
import cors from 'cors';
import { Sequelize } from 'sequelize';

import { Routes } from '../routes/routes';
import { AccessControl } from '../security/accessControl';
import { RouterHandler } from '../security/routerHandler';
import { ControllerGroup, Controllers } from '../controllers/controllers';
import { Connections } from '../database/connections';

export class HttpServer {
  private app: Express;
  private router: Router;

  constructor(private serverPort: number) {
    this.app = express();
    this.app.use(express.json());
    this.app.use(cors());
    this.router = Router();
  }

  public async initialize() {
    const { coreDB } = await new Connections().initConnections();
    const controllers = this.setupControllers(coreDB);
    this.setupRoutes(controllers);

    this.app.listen(this.serverPort, () => {
      console.log(
        `☀️ Server is running at http://localhost:${this.serverPort}`
      );
    });
  }

  private setupRoutes(controllers: ControllerGroup): void {
    const accessControl = new AccessControl();
    const routerHandler = new RouterHandler(
      this.router,
      controllers,
      accessControl
    );

    const configurator = new Routes(routerHandler);

    this.app.use(configurator.setup());
  }

  private setupControllers(database: Sequelize): ControllerGroup {
    const controllers = new Controllers(database).setup();

    return controllers;
  }
}
