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
    imageURL:{
        type: DataTypes.STRING,
        defaultValue: 'https://peliculas.fra1.digitaloceanspaces.com/actores/370/actor-mirella-cardoso-0.jpg',
    },
    name: {
        type: DataTypes.STRING,
    },
    email: {
        type: DataTypes.STRING,
        defaultValue: 'example@test.com'
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    status:{
        type: DataTypes.STRING,
        defaultValue: "active"
    },
    followed:{
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
}, {
    sequelize,
    modelName: "user"
});


sequelize.sync({alert:true}).then(result=>{
    console.log("DB synchronized");
    // for(let i=0; i<5; i++){
    //     User.create({
    //         name: `user${i+1}`,
    //         email: `user${i+1}@test.com`,
    //         password: `password${i+1}`
    //     }).then(response=>{});
    // }
})
    .catch(err=> console.log(err));
