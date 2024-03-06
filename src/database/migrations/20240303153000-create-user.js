module.exports = {
  up: async (queryInterface) => {
    const transaction = await queryInterface.sequelize.transaction();

    try {
      await queryInterface.sequelize.query(
        `
        CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
      `,
        { transaction }
      );

      await queryInterface.sequelize.query(
        `
        CREATE TABLE users (
          token UUID PRIMARY KEY DEFAULT uuid_generate_v4() NOT NULL,
          username VARCHAR(31) NOT NULL,
          password VARCHAR(255) NOT NULL,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
          last_login TIMESTAMP NOT NULL
        );`,
        { transaction }
      );

      await transaction.commit();
    } catch (error) {
      if (transaction) {
        await transaction.rollback();
      }
      throw error;
    }
  },
  down: async (queryInterface) => {
    await queryInterface.sequelize.query(`DROP TABLE users`);
  },
};
