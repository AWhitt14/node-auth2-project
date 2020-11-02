const express = require("express")
const cookieParser = require("cookie-parser")
const userRouter = require("./Users/user-router")
const server = express();
const port = 3000

server.use(express.json())
server.use(cookieParser())
server.use("/users", userRouter)

server.get("/",(req,res,next)=> {
    res.json({message: "hello"})
})
server.use((er,req,res,next)=> {
    console.log(er)
    res.status(500).json({message: "serverside error"})
})

server.listen(port, () => {
    console.log(`http://localhost:${port}`)
})