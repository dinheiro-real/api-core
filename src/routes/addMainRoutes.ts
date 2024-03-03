import { Router, Request, Response } from "express";

export function addMainRoutes(route: Router) {
    route.get('/', (req: Request, res: Response) => res.send('Hello, World'));
}