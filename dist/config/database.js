"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sqlInstance = void 0;
exports.initDatabase = initDatabase;
const sequelize_1 = require("sequelize");
const path = require('path');
const envPath = '/mnt/c/Users/cid/Documents/practice/subscriber-app/.env.local';
require('dotenv').config({ path: envPath });
const DB_HOST = process.env.DB_HOST || 'localhost';
const DB_PORT = process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 5432;
const DB_NAME = process.env.DB_NAME || 'postgres';
const DB_USER = process.env.DB_USER || 'postgres';
const DB_PASSWORD = process.env.DB_PASSWORD || 'mysecretpassword';
const sequelize = new sequelize_1.Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
    host: DB_HOST,
    port: DB_PORT,
    dialect: 'postgres',
    logging: false,
});
exports.sqlInstance = sequelize;
async function initDatabase() {
    try {
        await sequelize.authenticate();
        console.log("DB Connection sakses!", sequelize.getDatabaseName());
        await sequelize.sync();
        console.log("models synced..", sequelize.models);
    }
    catch (error) {
        console.error('unable to process', error);
    }
}
