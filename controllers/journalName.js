import { PrismaClient } from "@prisma/client"
import { ApiResponse } from "../utils/ApiResponse.js"
import { ApiError } from "../utils/ApiError.js"

const prisma = new PrismaClient()

export const getAllJournal = async (req, res) => {
    try {
        console.log("Get All Journal for user:", req.user.id);

        // Fetch journals associated with the authenticated user
        const result = await prisma.journal.findMany({
            where: {
                AND: {
                    isDisabled: false,
                    userId: req.user.id,
                },
            },
        });

        return res.status(200).json({
            responseBody: new ApiResponse(200, result, "SUCCESS"),
        });
    } catch (error) {
        console.error("Error fetching journals:", error);

        return res.status(500).json({
            responseBody: new ApiError(500, "Failed to retrieve journals", error.message, ""),
        });
    }
};


export const addJournal = async(req,res) =>{

    try {
        
        const {journalName,isDisabled} = req.body.requestBody
        console.log(req.user)

    const result = await prisma.journal.create({
        data:{
            journalName:journalName,
            isDisabled:isDisabled,
            userId:req.user.id
        }
        
    })

    if(result){
        return res.json({
            responseBody:new ApiResponse(200,result,"SUCCESS")
        })
    }

    } catch (error) {
        console.log(error)
        return res.json({
            responseBody:new ApiError(404,"Something went wrong",error)
        })   
    }
    
    
    
}

export const editJournalName =  async (req,res) =>{
    const {id,journalName} = req.body.requestBody
    try {
        const result = await prisma.journal.update({
            data:{
                journalName:journalName
            },where:{
                id:id
            }
        })

        if(result){
            return res.json({
                responseBody:new ApiResponse(200,result,"SUCCESS")
            })
        }
    } catch (error) {
            console.log(error)
            return res.json({
                responseBody:new ApiError(404,"Something went wrong",error)
            })
    }
}

export const deleteJournal = async(req,res) =>{
    
    try {
        const {id} = req.body.requestBody

    const result = await prisma.journal.update({
        data:{
            isDisabled:true
        },
        where:{
            id:id
        }
    })

    if(result){
        return res.json({
            responseBody:new ApiResponse(200,result,"SUCCESS")
        })
    }
    } catch (error) {
        return res.json({
            responseBody:new ApiError(404,error,"FAILURE")
        })
    }
    
}