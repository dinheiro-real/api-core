module.exports = {
  dev: {
    define: {
      charset: 'utf8',
      collate: 'utf8_general_ci',
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
    logging: false,
    url: 'postgresql://user:root@172.31.0.2:5432/dinheiro_real',
    dialect: 'postgres',
    dialectOptions: {
      decimalNumbers: true,
    },
  },
};
