import jwt from 'jsonwebtoken'

export const generateJWT = (user) =>{
return jwt.sign(user,process.env.JWT_SECRET_KEY,{
    expiresIn:'1d'
}) 
}

export const verifyJWT = (user) => {

} 