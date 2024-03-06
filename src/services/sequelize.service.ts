import { Options, Sequelize } from 'sequelize';
import { logger } from '../configs/logger';

const MINUTE_IN_MILLISECONDS = 1000;

const DEFAULT_OPTIONS: Options = {
  define: {
    charset: 'utf8',
    collate: 'utf8_general_ci',
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
  logging: console.log,
  pool: {
    max: 25,
    min: 0,
    acquire: 30000,
    idle: 5 * MINUTE_IN_MILLISECONDS,
  },
  dialect: 'postgres',
  dialectOptions: {
    decimalNumbers: true,
  },
  timezone: '-03:00',
};

export class SequelizeService {
  public async createConnectionPool(configs: Options): Promise<Sequelize> {
    try {
      const sequelize = new Sequelize({
        ...DEFAULT_OPTIONS,
        ...configs,
      });

      await sequelize.authenticate();

      console.log(
        `💽 Database ${configs.database} connection has been established successfully.`
      );

      return sequelize;
    } catch (err) {
      logger.error('Unable to connect to database', { err });

      throw err;
    }
  }
}
