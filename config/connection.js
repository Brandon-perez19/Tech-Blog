import Sequelize from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

//creating connection to the database
//setting up credentials with env access and heroku access
const sequelize = process.env.JAWSDB_URL
? new Sequelize (process.env.JAWSDB_URL)
: new Sequelize (process.env.DB_NAME, process.env.DB_USER, process.env.DB_PW, {
    host: 'localhost',
    dialect: 'mysql',
    port:3306
});

export default sequelize