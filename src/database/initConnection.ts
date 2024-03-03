import { Pool, PoolClient } from 'pg';
import { runMigration } from './runMigrations';

export class Connections {
  public async init(): Promise<{ coreDB: PoolClient }> {
    const coreDbConfig = this.getCoreDatabaseConfig();
    const coreDB = await coreDbConfig.connect();

    runMigration(coreDB);

    return { coreDB };
  }

  private getCoreDatabaseConfig(): Pool {
    const config = new Pool({
      host: process.env.POSTGRES_HOST,
      database: process.env.POSTGRES_DB,
      port: Number(process.env.POSTGRES_PORT),
      user: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
    });

    return config;
  }
}
