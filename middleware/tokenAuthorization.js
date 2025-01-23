import { ApiError } from "../utils/ApiError.js"
import jwt from 'jsonwebtoken'

export function tokenAuthorization(req,res,next){
    console.log("Middleware Hit")
    const authCookie = req.cookies['auth-cookie']

    if(authCookie === null){
        return res.json({
            responseBody:new ApiError(401,"UnAuthorized Access")
        })
    }

    jwt.verify(authCookie,process.env.JWT_SECRET_KEY,(err,user) => {
        if(err){
            return res.json({
                responseBody:new ApiError(401,"UnAuthorized Access")
            })
        }

        req.user = user;
        next();
    })

    
    
}