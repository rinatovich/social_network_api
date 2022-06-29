import {
    createCollection,
    getUser,
    removeUser,
    signUpUsers,
    updateUser,
    createItem,
    getCollection,
    removeCollection,
    getUsers,
    getUserCollections,
    updateCollection,
    getCollectionItems,
    getItem,
    removeItem,
    updateItem,
    addLike,
    getUserLikes,
    unLike,
    getItemLikes,
    addComment,
    getItemComments,
    getUserComments, updateComment, removeComment
} from "../controllers/usersController.js";

export const router = (app)=>{
    app.get('/api/users', getUsers);
    app.post('/api/users/signup',signUpUsers);
    app.get('/api/users/get',getUser);
    app.put('/api/users/update',updateUser);
    app.delete('/api/users/remove',removeUser);
    app.get('/api/user/collections',getUserCollections);

    app.post('/api/collection/create',createCollection);
    app.get('/api/collection/get', getCollection);
    app.delete('/api/collection/remove',removeCollection);
    app.put('/api/collection/update',updateCollection);
    app.get('/api/collection/items',getCollectionItems);

    app.post('/api/item/create',createItem);
    app.get('/api/item/get', getItem);
    app.delete('/api/item/remove',removeItem);
    app.put('/api/item/update',updateItem);

    app.post('/api/item/like/add',addLike);
    app.get('/api/item/likes',getItemLikes);
    app.delete('/api/item/unlike',unLike);
    app.get('/api/user/likes',getUserLikes);

    app.post('/api/user/comment/add', addComment);
    app.get('/api/item/comments', getItemComments);
    app.get('/api/user/comments',getUserComments);
    app.put('/api/comment/update',updateComment);
    app.delete('/api/comment/remove',removeComment);

}