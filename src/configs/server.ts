import express, { Express, Router } from 'express';
import { RouterConfigurator } from '../routes/routerConfigurator';

export class HttpServer {
    private app: Express;

    constructor(serverPort: number) {
        this.app = express();
        this.app.use(express.json());
        this.app.listen(serverPort, () => {
            console.log(`Server is running at http://localhost:${serverPort}`);
        });
    }

    public setup() {
        this.setupRoutes();
    }

    public setupRoutes() {
        const router = Router();
        const configurator = new RouterConfigurator(router);
        this.app.use(configurator.setup());
    }
}