const socket = io()

//esta es la llave publica de la otra persona
let e2 = 0;
let n2 = 0;

//DOM elements
let message = document.getElementById('message');
let username = document.getElementById('username');
let btn = document.getElementById('send');
let output = document.getElementById('output');
let actions = document.getElementById('actions');

//generamos las llaves para este usuario
generateKeys();

//hacemos el intercambio de llaves
function change(){
    socket.emit('chat:key', {
        ee:e,
        nn:n
    });
}

socket.on('chat:key',function(keys){
    e2 = keys.ee;
    n2 = keys.nn;
    console.log(e2, n2)
});


//esto ya es del chat
btn.addEventListener('click', function(){
    //ciframos el mensaje antes de enviarlo
    let mess = doFinalC(message.value, e2, n2);
    //emitimos un mensaje al servidor
    socket.emit('chat:message',{
        message: mess,
        username: username.value
    });
});

message.addEventListener('keypress',function (){
    socket.emit('chat:typing', username.value);
});

socket.on('chat:message', function(data){
    //vamos a decifrar
    let mess = doFinalD(data.message);
    actions.innerHTML = '';
    output.innerHTML += `<p>
    <strong>${data.username}</strong>: ${mess}
    </p>`
});

socket.on('chat:typing', function(data){
    actions.innerHTML = `<p>
    <em>${data} is typing</em>
    </p>`
});