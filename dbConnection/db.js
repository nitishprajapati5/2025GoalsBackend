import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

async function dbConnection(){
    await prisma.$connect().then((res) => {
        console.log("Database Connected Successfully")
    }).catch((error) => {
        console.log("Error in Connecting",error)
    })
}
export default dbConnection;