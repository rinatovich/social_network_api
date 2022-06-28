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
    getItem, removeItem, updateItem
} from "../controllers/usersController.js";

export const router = (app)=>{
    app.get('/api/users', getUsers);
    app.post('/api/users/signup',signUpUsers);
    app.get('/api/users/get',getUser);
    app.put('/api/users/update',updateUser);
    app.delete('/api/users/remove',removeUser);

    app.post('/api/collection/create',createCollection);
    app.get('/api/user/collections',getUserCollections);
    app.get('/api/collection/get', getCollection);
    app.delete('/api/collection/remove',removeCollection);
    app.put('/api/collection/update',updateCollection);

    app.post('/api/item/create',createItem);
    app.get('/api/collection/items',getCollectionItems);
    app.get('/api/item/get', getItem);
    app.delete('/api/item/remove',removeItem);
    app.put('/api/item/update',updateItem);
}