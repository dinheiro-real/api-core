import { HttpMethod } from '../constants/configs/enum';
import { RouterHandler } from '../security/routerHandler';

export function addMainRoutes(routerHandler: RouterHandler): void {
  routerHandler.addRoute({
    path: '/',
    method: HttpMethod.GET,
    controllerName: 'MainController',
    actionName: 'healthAction',
    middlewares: [],
  });
}
