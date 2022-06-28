import {
    createCollection, getAllCollectionsOfUser,
    getUser,
    removeUser,
    signUpUsers,
    updateUser,
    createItem, getCollection, removeCollection, getUsers
} from "../controllers/usersController.js";

export const router = (app)=>{
    app.get('/api/users', getUsers);
    app.post('/api/users/signup',signUpUsers);
    app.get('/api/users/get',getUser);
    app.put('/api/users/update',updateUser);
    app.delete('/api/users/remove',removeUser);

    app.get('/api/collection/create',createCollection);
    app.get('/api/users/getusercollections',getAllCollectionsOfUser);
    app.get('/api/getCollection', getCollection);
    app.delete('/api/removecollection',removeCollection)
    app.get('/api/users/collecton/createitem',createItem);
}