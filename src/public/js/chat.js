const socket = io()

let user;
let chatbox = document.getElementById('chatbox');
let log = document.getElementById('msgLogs');
let data;

socket.on('message', msg =>{
    data = msg;
})

socket.on('msgLogs', data =>{
    render(data);
})

const render = (msgs) => {
    let messages = "";

    msgs.forEach(message => {
        const isCurrentUser = message.user === user;
        const messageClass = isCurrentUser ? 'my-message' : 'other-message';

        messages = messages + `<div class="${messageClass}">${message.user}: ${message.message}</div>`
    })

    log.innerHTML = messages;
    chatbox.scrollIntoView(false);
}

Swal.fire({
    title: 'Registrate',
    input: 'email',
    text: "Ingresa tu correo electronico",
    inputValidator: (value) => {
        if (!value)
            return 'El correo electronico es requerido para continuar'

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(value))
            return "El correo no es valido";

        return null;
    },
    allowOutsideClick: false
}).then(result => {
    if (result.isConfirmed){
        user = result.value;
        render(data);
    }
})

chatbox.addEventListener('keyup', e => {
    if(e.key === 'Enter') {
        if (chatbox.value.trim().length > 0) {
            const message = chatbox.value;
            socket.emit('message', { user, message });
            chatbox.value = '';
        }
    }
})

socket.on('newUser', () => {
    Swal.fire({
        text: "Nuevo usuario conectado",
        toast: true,
        position: 'bot-right'
    })
})