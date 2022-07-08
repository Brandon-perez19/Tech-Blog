//import sequelize and associated methods
import pkg from 'sequelize';
const { Sequelize, Model, DataTypes } = pkg;

//import database connection
import sequelize from '../config/connection';

//creates class user and extends off sequelize model
class User extends Model{
    //{password encryption checker}
}

//defining user table columns and configuration
User.init (
    {
        //Table column definitions
        //id column 
        id:{
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate:{
                len: [8]
            }
        },
        email:{
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate:{
                isEmail: true
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len:[4]
            }
        }
    },
    {   //{hooks for password encryption}

        //table configuration options
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: "user"
    }
)