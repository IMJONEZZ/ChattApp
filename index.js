const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();

app.set('port', (process.env.PORT || 3000));

const server = http.createServer(app);
const io = socketIo.listen(server);

const UsersService = require('./UsersService')
const userService = new UsersService();

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', socket => {
    socket.on('join', name => {
        userService.addUser({
            id: socket.id,
            name
        });
        io.emit('update', {
            users: userService.getAllUsers()
        });
    });

    socket.on('disconnect', () => {
        userService.removeUser(socket.id);
        socket.broadcast.emit('update', {
            users: userService.getAllUsers()
        });
    });

    socket.on('message', message => {
        const {name} = userService.getUserById(socket.id);
        socket.broadcast.emit('message', {
            text: message.text,
            from: name
        });
    });

    socket.on('getUsers', () => {
        io.emit('update', {
            users: userService.getAllUsers()
        });
    });
});

server.listen(app.get('port'), () => {
    console.log('listening on ', app.get('port'));
});

