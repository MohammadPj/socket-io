const express = require("express")
const http = require("http")
const {Server} = require("socket.io")
const cors = require("cors")

const app = express()
app.use(cors())
const server = http.createServer(app)

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3002",
        methods: ["GET", "POST"]
    }
})

io.on("connection", (socket) => {
    console.log(`user connected: ${socket.id}`)

    socket.on("join_room", (data) => {
        socket.join(data)
    })

    socket.on("send_message", (data) => {
        console.log("data", data)
        // socket.broadcast.emit("receive_message", data)
        socket.to(data.room).emit("receive_message", data)
    })
})

const PORT = 3001
server.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`)
})