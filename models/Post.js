//import sequelize and associated methods
import pkg from 'sequelize';
const { Sequelize, Model, DataTypes } = pkg;

//import database connection
import sequelize from '../config/connection';

class Post extends Model {

}

//table columns and configuration
Post.init({
    //table column definitions
    id:{
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    title:{
        type:DataTypes.STRING,
        allowNull: false,
        validate:{
            len:[10]
        }
    },
    post_url:{
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            isUrl: true
        }
    },
    user_id:{
        type: DataTypes.STRING,
        references:{
            model: "user",
            key: 'id'
        }
    }
},
{ //configurations
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'post'

})

export default Post