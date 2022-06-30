import {response} from "../settings/response.js";
import {Collection, Item, Like, User,Comment} from "../database/models.js";
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
    removeModel(User,req.body,res);
}


export const createCollection = (req,res)=>{
    User.findOne({where: req.body.owner}).then(user=>{
        if(!user) {
            response(404, "User not found", res);
        }
        else{
                user.createCollection(req.body.collection)
                    .then(result=>{response(200,result,res)})
                    .catch(err=>{response(501, err, res)});
            }
    }).catch(err=>response(500,{message: err},res));
}

export const getUserCollections = (req,res)=>{
    User.findByPk(req.body.id).then(user=>{
        if(!user) response(500, {message:"user not found"},res);
        user.getCollections()
            .then(result=>{
                response(200,result,res);
            })
            .catch(err=>response(500,err,res));
    }).catch(err=>response(500, err,res));
}

export const getCollections = (req,res)=>{
    Collection.findAll({raw:true}).then(collection=>{
        response(200,collection,res)
    }).catch(err=>response(501, err,res));
}

export const getCollection = (req,res)=>{
    getModel(Collection,req.body,res);
}

export const removeCollection = (req,res)=>{
    removeModel(Collection,req.body,res);
}

export const updateCollection = (req,res)=>{
    updateModelProps(Collection,req.body,res);
}


export const createItem = (req,res)=>{
    Collection.findOne({where: req.body.owner}).then(collection=>{
        if(!collection) {
            response(404, "User not found", res);
        }
        else{
            collection.createItem(req.body.item)
                .then(result=>{response(200,result,res)})
                .catch(err=>{response(501, err, res)});
        }
    }).catch(err=>response(500,{message: err},res));
}

export const getCollectionItems = (req,res)=>{
    Collection.findOne({where: req.body}).then(collection=>{
        if(!collection) response(500, {message:"user not found"},res);
        collection.getItems()
            .then(result=>{
                response(200,result,res);
            })
            .catch(err=>response(500,err,res));
    }).catch(err=>response(500, err,res));
}

export const getItems = (req,res)=>{
    Item.findAll({raw:true}).then(items=>{
        response(200,items,res)
    }).catch(err=>response(501, err,res));
}

export const getItem = (req,res)=>{
    getModel(Item,req.body,res);
}

export const removeItem = (req,res)=>{
    removeModel(Item,req.body,res);
}

export const updateItem = (req,res)=>{
    updateModelProps(Item,req.body,res);
}


export const addLike = (req,res)=>{
    /*{user:{username:"username",userId:"userId"},item:{name||id}}*/
    Item.findOne({where: req.body.item}).then(item=>{
        if(!item) {
            response(404, "User not found", res);
        }
        else{
            item.createLike(req.body.user)
                .then(result=>{response(200,result,res)})
                .catch(err=>{response(501, err, res)});
        }
    }).catch(err=>response(500,{message: err},res));

}

export const getItemLikes = (req,res)=>{
    Item.findOne({where: req.body}).then(item=>{
        if(!item) response(500, {message:"user not found"},res);
        item.getLikes()
            .then(result=>{
                response(200,result,res);
            })
            .catch(err=>response(500,err,res));
    }).catch(err=>response(500, err,res));
}

export const getUserLikes = (req,res)=>{
    Like.findAll({where: req.body}).then(like=>{
        if(!like) {
            response(500, {message:"user not found"},res);
        }
        else{
            response(200,like, res);
        }
    }).catch(err=>response(500, err,res));
}

export const unLike = (req,res)=>{
    removeModel(Like,req.body,res);
}


export const addComment = (req,res)=>{
    /*{user:{username:"username",userId:"userId"},item:{name||id}}*/
    Item.findOne({where: req.body.item}).then(item=>{
        if(!item) {
            response(404, "User not found", res);
        }
        else{
            item.createComment(req.body.comment)
                .then(result=>{response(200,result,res)})
                .catch(err=>{response(501, err, res)});
        }
    }).catch(err=>response(500,{message: err},res));

}

export const getItemComments = (req,res)=>{
    Item.findOne({where: req.body}).then(item=>{
        if(!item) response(500, {message:"user not found"},res);
        item.getComments()
            .then(result=>{
                response(200,result,res);
            })
            .catch(err=>response(500,err,res));
    }).catch(err=>response(500, err,res));
}

export const getUserComments = (req,res)=>{
    Comment.findAll({where: req.body}).then(like=>{
        if(!like) {
            response(500, {message:"user not found"},res);
        }
        else{
            response(200,like, res);
        }
    }).catch(err=>response(500, err,res));
}

export const updateComment = (req,res)=>{
    updateModelProps(Comment, req.body, res);
}

export const removeComment = (req,res)=>{
    removeModel(Comment,req.body,res);
}