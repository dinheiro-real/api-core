import { logger } from '../../configs/logger';
export class HealthCommand {
  public execute(): string {
    logger.info('HealthCommand initiated');
    return 'Hello, World';
  }
}
