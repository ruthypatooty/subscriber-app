import { Sequelize } from "sequelize";
import path from 'path';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const envPath = path.resolve(__dirname, '../../.env.local');

dotenv.config({path: envPath});

const DB_HOST = process.env.DB_HOST;
const DB_PORT = process.env.DB_PORT;
const DB_NAME = process.env.DB_NAME;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
console.log("DB_HOST from env:", process.env.DB_HOST);

if (!DB_NAME || !DB_USER || !DB_PASSWORD) {
    throw new Error("Database configuration error: DB_NAME, DB_USER, and DB_PASSWORD must be set in environment variables.");
}

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
    host: DB_HOST,
    port: DB_PORT as unknown as number,
    dialect: 'postgres',
    logging: false,
});

export const sqlInstance = sequelize;

export async function initDatabase(){
    try{
        await sequelize.authenticate();
        console.log("DB Connection sakses!",sequelize.getDatabaseName());

        await sequelize.sync();
        console.log("models synced..",sequelize.models);
    }catch(error){
        console.error('unable to process', error);
    }
}