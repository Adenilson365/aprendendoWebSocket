const socket = io('http://localhost:3000')

socket.on('update_messages', (messages)=>{
    updateMessagesOnScreen(messages);
})

let user = null;

function updateMessagesOnScreen(messages){
    const div_messages = document.querySelector('#messages');
    let list_messages = '<ul class="list-class">'
    messages.forEach(message => {
        if(user == message.user){
        list_messages += `<li class="user-principal"><div>${message.user}:${message.msg}</div></li>`
        }else{
            list_messages += `<li class ="user-secondary"><div >${message.user}:${message.msg}</div></li>`
        }
    });
    list_messages += '</ul>';
    div_messages.innerHTML = list_messages;

    

 }

document.addEventListener('DOMContentLoaded', ()=>{
    const form = document.querySelector('#form-msg');
    form.addEventListener('submit', (e)=>{
        e.preventDefault();
        if(!user){
            alert("Defina Usuário");
            return;
        }
        const message = document.forms['msg-form']['msg'].value;
        if(!message ==''){
            document.forms['msg-form']['msg'].value ='';
            socket.emit('new_message',{user:user,msg:message});  
        }
    })

    const userForm = document.querySelector('#user-form');
    userForm.addEventListener('submit', (e)=>{
        e.preventDefault();
         user = document.forms['user-form']['user'].value;
        if(!user){
            alert("Defina Usuario");
            return;
        }
        userForm.parentNode.removeChild(userForm);
    })
})

