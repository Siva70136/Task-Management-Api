const { DataSource } = require('typeorm');
const { User } = require('../entities/user');
const Role  = require('../entities/Role');
const Task = require('../entities/task');
require('dotenv').config();



const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '3306'),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: true,
  entities: [User, Role, Task],
});

// console.log(AppDataSource);

module.exports = { AppDataSource };
