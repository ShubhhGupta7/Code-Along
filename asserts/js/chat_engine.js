class ChatEngine{
    constructor(chatBoxId, userId){
        this.chatBox = $(`#${chatBoxId}`);
        this.userId = userId;

        this.socket = io.connect('http://localhost:5000');

        let self = this;
        if (this.userId){
            let connectTo =$('.connect-to');
            for(let i = 0; i < connectTo.length; i++) {
                let friendId = $(connectTo[i]).attr('data-id');

                let key =  self.getKey(friendId, self.userId);
                console.log('key', key);
                self.key = key;
                self.connectionHandler(key);
                console.log('controller called');
            }

            connectTo.click( this,function(event) {
                event.preventDefault();

                let name = $(this).attr('data-name');
                console.log(name);
                $('#curr-user-name').html(`${name}`);
                
                let userAva = $(this).attr('data-img');;
                if(!userAva) {
                    userAva = "https://www.kindpng.com/picc/m/78-786207_user-avatar-png-user-avatar-icon-png-transparent.png" 
                }
                $('#curr-user-img').prop({
                    src: userAva
                });
                

                let friendId = $(this).attr('data-id');
                
                let key =  self.getKey(friendId, self.userId);
                
                console.log('key', key);
                self.receiveKey = key;
            });
        }

    }

    getKey(friendId, userId) {
        let key = 0;

        let toMultiply = 1;
        for(let i = 0; i < friendId.length; i++) {
      
            let digit = (friendId.charCodeAt(i) + userId.charCodeAt(i)) * toMultiply;
            key += digit;
            toMultiply *= 2;
        }
        return key;
    }

    connectionHandler(sendkey) {
        console.log('connection Handler called!');
        let self = this;

        this.socket.on('connect', function(){
            console.log('connection established using sockets...!');


            self.socket.emit('join_room', {
                user_id: self.userId,
                chatroom: sendkey
            });

            self.socket.on('user_joined', function(data){
                console.log('a user joined!', data);
            })


        });

        // CHANGE :: send a message on clicking the send message button
        let snedMessageHandler = function(){
            let msg = $('#chat-message-input').val();

            if (msg != ''){
                $('#chat-message-input').val('');
                self.socket.emit('send_message', {
                    message: msg,
                    user_id: self.userId,
                    chatroom: self.receiveKey

                });
            }
        }
        
        $('#send-message').click(snedMessageHandler);
        $('#chat-message-input').keypress(function(event) {
            if(event.which == 13) {
                event.preventDefault();
                snedMessageHandler();
            }
        });

        self.socket.on('receive_message', function(data){
            console.log('message received', data);


            let newMessage = $('<li>');

            let messageType = 'friend-message';
            
            if (data.user._id == self.userId){
                messageType = 'user-message';
            }

            let messageContainer = $('<div>').addClass("mssg-info-container"); 
            newMessage.append(messageContainer);
            
            messageContainer.append($('<p>', {
                'html': data.message
            }));

            let userAva = data.user.avatar;
            if(!data.user.avatar) {
                userAva = "https://www.kindpng.com/picc/m/78-786207_user-avatar-png-user-avatar-icon-png-transparent.png" 
            }


            if( messageType == 'user-message') {
                messageContainer.append($('<img>', {
                    'src': userAva
                }));
            } else {
                messageContainer.prepend($('<img>', {
                    'src': userAva
                }));
            }
            

            newMessage.addClass(messageType);

            $('#chat-message-list').append(newMessage);
            $('#chat-interface').animate({ scrollTop: $('#chat-message-list').height() }, 0);            
        });
    }
}