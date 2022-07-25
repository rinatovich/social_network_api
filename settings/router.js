import {
    getUser,
    removeUser,
    signUpUsers,
    updateUser,
    getUsers,
    signInUsers,
} from "../controllers/usersController.js";
import passport from 'passport';

export const router = (app)=>{

    app.get('/api/users',passport.authenticate('jwt',{session:false}), getUsers);
    app.post('/api/users/signup',signUpUsers);
    app.post('/api/users/sigin',signInUsers);
    app.get('/api/user/:id',getUser);
    app.put('/api/users/update',updateUser);
    app.delete('/api/users/remove',removeUser);


}