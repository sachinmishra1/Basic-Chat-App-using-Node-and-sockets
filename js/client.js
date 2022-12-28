const socket = io('http://localhost:8000');

const form = document.getElementById('send-container');
const messageInput = document.getElementById('inputMessage');
const messageContainer = document.querySelector('.container');

var audio = new Audio('../tuin.wav');
const append=(message, position)=>{
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
    if(position == 'Left'){
        audio.play();
    }
}

form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const message = messageInput.value;
    append(`You: ${message}`,'Right');
    socket.emit('send',message);
    messageInput.value='';
})
const name = prompt("Enter Your Name to Join: ");
socket.emit('new-user-joined',name);

socket.on('user-joined',name=>{
    if(name!==null){
    append(`${name} joined the Chat`,'Right');
    }
});

socket.on('receive',data=>{
    if(data.name!==null){
    append(`${data.name}: ${data.message}`,'Left');
    }
});

socket.on('left',name=>{
    if(name!==null){
    append(`${name} left the Chat..`,'Left');
    }
});

