// socket.io must be included both on the frontend and backend as it is a two 
// way communication and first user requests the server then server responds to it.

// used for:
// Document Collaboration: That means at the same time we both look at the same 
// doc and can change it. Ex: google docs, code pair at coding ninjas.

// Instant messaging and chat: chat engine.

// Real-time Analytics: When we want to show real time information updates,
// notifications popups. Ex: Stock market website real time information.

// Binary Streaming: We can send any blob back and forth: like: video, audio, image

const User = require('../models/user');


module.exports.chatSockets = function(socketServer){
    // io have all the sockets.
    // let io = require('socket.io')(socketServer);

    const io = require('socket.io')(socketServer,{
        cors: {
            origin: "*",
            methods: ["GET", "POST"],
            allowedHeaders: ["my-custom-header"],
            credentials: true
          },
          
      })

    // receiving the request for connection
    io.sockets.on('connection', function(socket){
        console.log('new connection received', socket.id);

        socket.on('disconnect', function(){
            console.log('socket disconnected!');
        });

        // requesting to leave the preveious room before entering to new room
        socket.on('leave_room', async function(data) {
            console.log('Leaving request rec.', data);

            await socket.leave(data.prevroom);
        });

        // requesting for joining the room  if there we connect else it will create new room
        socket.on('join_room', async function(data){
            console.log('joining request rec.', data);

            await socket.join(data.chatroom);

            await io.in(data.chatroom).emit('user_joined', data);
        });

        // CHANGE :: detect send_message and broadcast to everyone in the room
        socket.on('send_message', function(data){
            User.findById(data.user_id, function(err, user) {
                if(err) {
                    console.log('User not found!', err);
                    return;
                }
                data.user = user;
                io.in(data.chatroom).emit('receive_message', data);
            });
            
            
            
        });

    });

}