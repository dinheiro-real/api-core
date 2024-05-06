import { SequelizeService } from '../services/sequelize.service';
import { Options, Sequelize } from 'sequelize';

export class Connections {
  public async initConnections(): Promise<{ coreDB: Sequelize }> {
    const sequelizeService = new SequelizeService();

    const coreDbConfig = this.getCoreDbConfig();

    const coreDB = await sequelizeService.createConnectionPool(coreDbConfig);

    return { coreDB };
  }

  private getCoreDbConfig(): Options {
    const config: Options = {
      host: process.env.POSTGRES_HOST,
      database: process.env.POSTGRES_DB,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
    };

    return config;
  }
}
