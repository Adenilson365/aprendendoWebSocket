const socket = io('http://localhost:3000')

socket.on('update_messages', (messages)=>{
    console.log('recebido')
    updateMessagesOnScreen(messages);
})


function updateMessagesOnScreen(messages){
    const div_messages = document.querySelector('#messages');

    let list_messages = '<ul>';
    messages.forEach(message => {
        list_messages += `<li>${message}</li>`
    });

    list_messages += '</ul>';
    div_messages.innerHTML = list_messages;
}

document.addEventListener('DOMContentLoaded', ()=>{
    const form = document.querySelector('#form-msg');
    form.addEventListener('submit', (e)=>{
        e.preventDefault();
        const message = document.forms['msg-form']['msg'].value;
        document.forms['msg-form']['msg'].value ='';
        socket.emit('new_message',{msg:message});
       
    })
})
