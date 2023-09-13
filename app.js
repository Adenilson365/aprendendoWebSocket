const express = require('express');
const app = express();
const path = require('path');
const socketIo = require('socket.io');

app.use('/', express.static(path.join(__dirname,'public')));

const server = app.listen(3000,()=>{
    console.log("Running");
})


const messages = [];

const io = socketIo(server);

io.on('connection', (socket)=>{
    console.log("New Connection");
    
    socket.on('new_message', (data)=>{
        console.log(data);
        console.log(data.msg, data.user);
        messages.push(data);
        io.emit('update_messages', messages)
        console.log(messages);
    })

})