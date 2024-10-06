const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const join = require('path');
const chatStore = require('./mongo');

const port = 3000;

app.get('', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

io.on('connection', (socket) => {
    console.log("user has connected");

    socket.on('chat', async (Username, Usermessage) => {
        try {
            let data = new chatStore(
                {
                    name: Username.trim(),
                    chat: Usermessage.trim()
                });
            let result = await data.save();
            console.log(result)
        } catch (error) {
            console.log("error saving chat", error)
        }
        console.log("name is: ", Username)
        console.log("mess is: ", Usermessage)
        io.emit('Servername', Username);
        io.emit('Servermessage', Usermessage);
    })
    
})

http.listen(port, () => {
    console.log("Listening on : " + port);
})

