import {response} from "../settings/response.js";
import User, {Collection} from "../database/models.js";

const updateModelProps = (model,object,res)=>{
    model.update(object.change, {
        where: object.user
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



export const signUpUsers = (req,res)=>{
    User.create({
        name: req.body.name,
        password: req.body.password,
    }).then(result=>{
        response(201,result,res);
    }).catch(err=>response(501,err,res));
}

export const getUsers = (req,res)=>{
    User.findAll({raw:true}).then(users=>{
        response(200,users,res)
    }).catch(err=>response(501, err,res));
}

export const getUser = (req,res)=>{
    getModel(User,req.body,res);
}

export const updateUser = (req,res)=>{
    updateModelProps(User,req.body,res);
}

export const removeUser = (req,res)=>{
    User.destroy({
        where: req.body

    }).then((result) => {
        if(result){
            response(200, {message: `User with ${Object.keys(req.body)[0]} ${req.body[Object.keys(req.body)[0]]}  removed`}, res);
        }
        else{
            response(501, {message: `User with ${Object.keys(req.body)[0]} ${req.body[Object.keys(req.body)[0]]} is not found`}, res);
        }
    }).catch(err=>{response(500, {message: err}, res)});
}




export const createCollection = (req,res)=>{
    User.findByPk(req.body.id).then(user=>{
        if(!user) {
            response(404, "User not found", res);
        }
        else{
            user.createCollection({name:req.body.collection.name})
                .then(result => response(200, result,res))
                .catch(err=>response(501, {message: err}, res));
        }
    }).catch(err=>response(500,{message: err},res));
}

export const getAllCollectionsOfUser = (req,res)=>{
    User.findByPk(req.body.id).then(user=>{
        if(!user) response(500, {message:"user not found"},res);
        user.getCollections()
            .then(result=>{
                response(200,result,res);
            })
            .catch(err=>response(500,err,res));
    }).catch(err=>response(500, err,res));
}

export const getCollection = (req,res)=>{
    Collection.findByPk(req.body.id)
        .then(collection=>{
            if(!collection) {
                response(404,"No user found", res);
            }
            response(200, collection, res);
        }).catch(err=>response(500,err,res));
}

export const removeCollection = (req,res)=>{
    Collection.destroy({
        where: {
            id: req.body.id
        }
    }).then((result) => {
        if(result){
            response(200, {message: `Collection with id: ${req.body.id} removed`}, res);
        }
        else{
            response(200, {message: `Collection with id: ${req.body.id} not found`}, res);
        }
    });
}

export const createItem = (req,res)=>{

}