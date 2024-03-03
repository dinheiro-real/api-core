import { Pool, PoolClient } from 'pg';

export class DatabaseConfigurator {
    private pool: Pool;

    constructor() {
        this.pool = new Pool({
            user: process.env.POSTGRES_USER,
            host: process.env.POSTGRES_HOST,
            database: process.env.POSTGRES_DB,
            password: process.env.POSTGRES_PASSWORD,
            port: parseInt(process.env.POSTGRES_PORT || '5432'),
        });

        this.pool.on('connect', () => {
            console.log('Database connection established.');
        });
    }

    public async testConnection(): Promise<PoolClient> {
        const client = await this.pool.connect();

        return client;

    }

    public getPool(): Pool {
        if (!this.pool) {
            throw new Error('Database pool has not been initialized.');
        }
        return this.pool;
    }
}
