import {response} from "../settings/response.js";
import {User} from "../database/models.js";
import {queryInterface} from "../database/db.js";
import {DataTypes} from "sequelize";

const updateModelProps = (model,object,res)=>{
    model.update(object.change, {
        where: object.object
    }).then((result) => {
        response(202,result,res);
    }).catch(err=>response(501,{message:err},res));
}
const getModel = (model,params, res)=>{
    model.findOne({where: params})
        .then(user=>{
            if(!user) {
                response(404,{message: `Model with ${Object.keys(params)[0]} ${params[Object.keys(params)[0]]} is not found`}, res);
            }
            else{
                response(200,user, res);
            }
        }).catch(err=>response(502, err,res));
}
const removeModel = (model,object,res)=>{
    model.destroy({
        where: object
    }).then((result) => {
        if(result){
            response(200, {message: `Collection with ${Object.keys(object)[0]} ${object[Object.keys(object)[0]]} removed`}, res);
        }
        else{
            response(200, {message: `Collection with  ${Object.keys(object)[0]} ${object[Object.keys(object)[0]]} not found`}, res);
        }
    });
}


export const signUpUsers = (req,res)=>{
    User.create({
        name: req.body.name,
        password: req.body.password,
    }).then(result=>{
        response(201,result,res);
    }).catch(err=>response(501,err,res));
}

export const getUsers = (req,res)=>{
    if(req.query.length != 0){
        const pageAsNumber = Number.parseInt(req.query.page);
        const sizeAsNumber = Number.parseInt(req.query.size);


        let page = 1;
        if(!Number.isNaN(pageAsNumber) && pageAsNumber>0){
            page = pageAsNumber-1;
        }

        let size = 10;
        if(!Number.isNaN(sizeAsNumber) && sizeAsNumber > 0 && sizeAsNumber < 10){
            size = sizeAsNumber;
        }


       User.findAndCountAll({
            limit: size,
            offset: page*size
        }).then(result=>{
                let data = {
                    data: result.rows,
                    totalPages:  Math.ceil(result.count / size),
                    count: result.count
                }
                response(200, data, res);
            }
        )
    }
    else{
        User.findAll({raw:true}).then(users=>{
            response(200,users,res)
        }).catch(err=>response(501, err,res));
    }
}

export const getUser = (req,res)=>{
    getModel(User,req.params,res);
}

export const updateUser = (req,res)=>{
    updateModelProps(User,req.body,res);
}

export const removeUser = (req,res)=>{
    removeModel(User,req.body,res);
}

