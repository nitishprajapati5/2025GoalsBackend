import { Prisma, PrismaClient } from "@prisma/client"
import bcrypt from 'bcrypt'
import { generateJWT } from "../utils/JWT.js"
import {ApiResponse} from '../utils/ApiResponse.js'
import {ApiError} from '../utils/ApiError.js'

const prisma = new PrismaClient()

export async function Login(req, res) {
    const { username, password } = req.body.requestBody;
    console.log(username, password);

    try {
        const user = await prisma.registration.findFirst({
            where: {
                AND: {
                    username: username
                }
            }
        });

        if (!user) {
            return res.status(404).json({
                responseBody: new ApiResponse(404, null, "User not found")
            });
        }

        // Await the bcrypt comparison
        const isMatch = await bcrypt.compare(password, user.password);
        
        if (isMatch) {
            res.cookie('auth-cookie', generateJWT(user), {
                httpOnly: true, // Prevent client-side JS access
                secure: process.env.NODE_ENV === 'production', // Only send over HTTPS in production
                sameSite: 'Strict', // Allow cross-origin cookies
                maxAge: 1000 * 60 * 60 * 24 // 1 day cookie
            });
            return res.status(200).json({
                responseBody: new ApiResponse(200, user, "SUCCESS")
            });

        } else {
            return res.status(401).json({
                responseBody: new ApiResponse(401, null, "Invalid email or password")
            });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            responseBody: new ApiError(500, "Something went wrong", error.message, "")
        });
    }
}

export async function Registration(req, res) {
    const { username, name, email, password } = req.body.requestBody;

    try {
        // Check if the user already exists
        const existingUser = await prisma.registration.findFirst({
            where: {
                username: username
            }
        });

        if (existingUser) {
            return res.status(200).json({
                responseBody: new ApiResponse(200, existingUser, "User Already Available")
            });
        }

        // Hash the password and create the user
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = await prisma.registration.create({
            data: {
                email: email,
                name: name,
                password: hashedPassword,
                username: username
            }
        });

        // Generate JWT with the new user's info
        const token = generateJWT(newUser);

        // Set the auth cookie
        res.cookie('auth-cookie', token, {
            httpOnly: true, // Prevent client-side JS access
            secure: process.env.NODE_ENV === 'production', // Only use `secure` cookies in production
            sameSite: 'None', // Prevent CSRF attacks
            maxAge: 1000 * 60 * 60 * 24 // 1 day cookie
        });

        // Return success response
        return res.status(200).json({
            responseBody: new ApiResponse(200, newUser, "SUCCESS")
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            responseBody: new ApiError(500, "Something went wrong", error.message, "")
        });
    }
}

 
export function checkUsername(req,res){

}