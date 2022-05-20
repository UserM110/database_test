import dotenv from 'dotenv'

dotenv.config();

const {
    PORT,
    NODE_ENV,
    POSTGRES_HOST,
    POSTGRES_DB,
    POSTGRES_DB_TEST,
    POSTGRES_PORT,
    POSTGRESS_USER,
    POSTGRES_PASSWORD,
} = process.env;

export default{
    port: PORT,
    host: POSTGRES_HOST,
    dbport: POSTGRES_PORT,
    database: NODE_ENV === 'dev' ? POSTGRES_DB : POSTGRES_DB_TEST,
    user: POSTGRESS_USER,
    password: POSTGRES_PASSWORD,
};