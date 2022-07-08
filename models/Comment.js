//import sequelize and associated methods
import pkg from 'sequelize';
const { Sequelize, Model, DataTypes } = pkg;

//import database connection
import sequelize from '../config/connection';

class Comment extends Model {

}

Comment.init ({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    comment_text: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [1]
        }
    },
    user_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'user',
            key: 'id'
        }
    },
    post_id:{
        type: DataTypes.INTEGER,
        references: {
            model: 'post',
            key: 'id'
        }
    }
},
{   //configurations
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'comment'
})

export default Comment