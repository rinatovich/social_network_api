import {DataTypes, Model} from "sequelize";
import {sequelize} from "./db.js";


export class User extends Model {}
User.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'active'
    },
}, {
    sequelize,
    modelName: "user"
});

export class Collection extends Model {}
Collection.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    theme: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'white'
    },
    description:{
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "Это крутая коллекция"
    }
}, {
    sequelize,
    modelName: "collection"
});

export class Item extends Model {}
Item.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    tag: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: 'white'
    }
}, {
    sequelize,
    modelName: "item"
});

export class Like extends Model {}
Like.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    userId:{
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
    },
}, {
    sequelize,
    modelName: "Like"
});

export class Comment extends Model {}
Comment.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    userId:{
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
    },
    text:{
        type: DataTypes.TEXT,
        defaultValue: "some text ..."
    }
}, {
    sequelize,
    modelName: "Comment"
});


User.hasMany(Collection,{ onDelete: null });
Collection.hasMany(Item,{ onDelete: null });
Item.hasMany(Like,{onDelete: "cascade"});
Item.hasMany(Comment, {onDelete: null});



sequelize.sync().then(result=>{
    console.log("DB synchronized");
})
    .catch(err=> console.log(err));
