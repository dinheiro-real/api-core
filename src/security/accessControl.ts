
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

import { IRouterParams } from './routerHandler';
import * as requestUtils from '../utils/request.utils';

export class AccessControl {
    constructor() { }

    public async isAllowedRoute(req: Request, res: Response, next: NextFunction, params: IRouterParams) {
        if (!req.headers.authorization) {
            return res.status(403).send({
                type: 'MISSING_PARAMETER_ERROR',
                message: 'Missing access token',
            });
        }

        try {
            const { error } =
                await this.validateJwt(req.headers.authorization);

            if (error) {
                return res.status(401).send({
                    message: 'Invalid section'
                });
            }
        } catch (error) {
            return res.status(498).json(error);
        }
    }

    private async validateJwt(token: string) {
        const cert = process.env.SECURITY_CODE || 'muito seguro';

        const promise = new Promise((resolve, reject) => {
            jwt.verify(token, cert, (error, decoded) => {
                if (error) {
                    return reject({
                        type: 'INVALID_CREDENTIALS',
                        message: 'Invalid credentials found on request.',
                    });
                }
                return resolve(decoded);
            });
        });

        return await requestUtils.asyncResult(promise)
    }
}
