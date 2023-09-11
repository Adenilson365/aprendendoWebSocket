const express = require('express');
const app = express();
const path = require('path');
const socketIO = require('socket.io');

const list = ["andre", "renan","ana"];

setTimeout(() => {
    list.push("Ricardo");
}, 6000);


app.use('/', express.static(path.join(__dirname,'public')));

app.get('/list', (req, res)=>{
    res.send(list);
})

const server = app.listen(3000,()=>{
    console.log("Rodando");
})

const io = socketIO(server);

io.on('connection', (socket)=>{
    console.log("New Connection")

    socket.emit('hello', {msg:"Seja bem vindo!"})

    socket.on("hello_client_response",(data=>{
        console.log(data.msg)
    }))
})