import express from 'express';
import {router} from './settings/router.js';
import bodyParser from "body-parser";
import cors from "cors";

const APP = express();
const PORT = process.env.PORT || 3001;

APP.use(bodyParser.urlencoded({extended: true}));
APP.use(bodyParser.json());
APP.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
});
APP.use(cors({
    origin: "*",
    methods: ["GET", "PUT", "POST", "DELETE"],
}))


router(APP);


APP.listen(PORT,()=>{
    console.log(`App is running on port ${PORT}`);
})