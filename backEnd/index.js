import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import authRoute from "./routes/auth.js"
import userRoute from "./routes/user.js"
import videoRoute from "./routes/video.js"
import commentRoute from "./routes/comments.js"
import cookieParser from "cookie-parser"
import cors from "cors"

const app = express()
dotenv.config()

//dataBase Conection
const mongoConnection = () => {
    try {
        mongoose.connect(process.env.MONGO, () => {
            console.log("connected to dataBase!")
        })
    } catch (err) {
        throw err
    }
}
mongoose.set('strictQuery', false);
mongoose.connection.on("connected", () => {
    console.log("Connected!")
})
mongoose.connection.off("disconnected", () => {
    console.log("DisConnected!")
})

//midelware
app.use(cookieParser())
app.use(express.json())
app.use(cors({credentials: true, origin: 'http://localhost:3000'}))


//Routes
app.use("/api/auth/",authRoute)
app.use("/api/user",userRoute)
app.use("/api/video",videoRoute)
app.use("/api/comments",commentRoute)

//ErrorHandelling
app.use((err, req, res, next) => {
    const errormessae = err.message || "somthing went wrong"
    const errorstatus = err.status || 500
    res.status(errorstatus).json({
        success: false,
        message: errormessae,
        status: errorstatus,
        stack: err.stack
    })
})


//Server Listning
app.listen(process.env.PORT,()=>{
    mongoConnection()
    console.log(`listning at port ${process.env.PORT}`)
})