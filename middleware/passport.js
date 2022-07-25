import passport_jwt from "passport-jwt";
import config from "../settings/config.js";
import {response} from "../settings/response.js";
import {User} from "../database/models.js";
import passport from "passport";

const ExtractJwt = passport_jwt.ExtractJwt;
const JwtStrategy = passport_jwt.Strategy;

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.jwt,
}

const passportMid =()=> {
    passport.use(
        new JwtStrategy(options, (payload,done)=>{
            try{
                User.findOne({where:{name: payload.name, id: payload.id}}).
                then(user=>{
                    if(user){
                        done(null,user)
                    }
                    else{
                        done(null,false)
                    }
                })
                    .catch(err=>response(400,err,res))
            } catch(e){
                console.log(e);
            }
        })
    )
}
export default passportMid;