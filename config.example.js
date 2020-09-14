module.exports = {
  BASE_URL: 'http://localhost:3000',
  APP: {
    NAME: 'Вывоз ТБО в Чувашской Республике'
  },
  JWT: {
    ACCESS_JWT_SECRET: 'ACCESS_SECRET',
    REFRESH_JWT_SECRET: 'REFRESH_SECRET',
    REFRESH_JWT_LIFE: '365d',
    ACCESS_JWT_LIFE: '1h'
  },
  DB: {
    NAME: 'practic',
    USER: 'anoha',
    PASSWORD: 0000,
    HOST: 'localhost',
    PORT: 5432
  }
};
