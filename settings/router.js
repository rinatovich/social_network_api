import {
    getUser,
    removeUser,
    signUpUsers,
    updateUser,
    getUsers,
} from "../controllers/usersController.js";

export const router = (app)=>{
    app.get('/api/users', getUsers);
    app.post('/api/users/signup',signUpUsers);
    app.get('/api/users/get',getUser);
    app.put('/api/users/update',updateUser);
    app.delete('/api/users/remove',removeUser);

}