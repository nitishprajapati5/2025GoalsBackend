import express, { json, urlencoded } from "express";
import dbConnection from "./dbConnection/db.js";
import authRoute from "./routes/authRoutes.js"
import dashboardRoute from './routes/dashboard.js'
import journalRoute from './routes/journalName.js'
import journalLeaf from './routes/journalLeafs.js'
import cookieParser from "cookie-parser";
import cors from 'cors'

const app = express();
const port = 3001

dbConnection().then((res) => {
    console.log("Data Base Connected Successfully")
}).catch((error) => {
    console.log("Error Occured",Error)
})
app.use(cors())
app.use(json())
app.use(cookieParser())
app.use(urlencoded({extended:true}))
//Routes
app.use('/api',authRoute)
app.use('/api',dashboardRoute)
app.use('/api',journalRoute)
app.use('/api',journalLeaf)


//Middleware




app.listen(port, () => (
    console.log(`Server Running on port ${port}`)
))