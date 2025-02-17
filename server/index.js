import express from "express"
import dotenv from "dotenv"
import ConnectDB from "./database/dbConnect.js"
import userRouter from "./route/user.route.js"
import cookieParser from "cookie-parser"
import cors from "cors"
import courseRouter from "./route/course.route.js"

dotenv.config({})

ConnectDB()

const app = express()

const PORT = process.env.PORT || 3000
//default middleare
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin:"http://localhost:5173",
    credentials: true
}))

//api
app.use("/api/v1/user", userRouter)
app.use("/api/v1/course", courseRouter)

app.get("/home", (_,res)=>{
    res.status(200).json({
        success: true,
        message: "hello"
    })
})

app.listen(PORT,()=>{
    console.log(`Server listen at port ${PORT}`)
})