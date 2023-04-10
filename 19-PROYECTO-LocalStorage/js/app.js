//variables
const formulario = document.querySelector('#formulario');
const listaTweets= document.querySelector('#lista-tweets');
let tweets = [];



//event listeners
eventListeners();

function eventListeners (){

    formulario.addEventListener('submit',agregarTweet);
    //cuando el documento esta listo
    document.addEventListener('DOMContentLoaded',()=>{
        tweets = JSON.parse(localStorage.getItem('tweets')) || [];

        console.log(tweets);
        crearHTML();
    });
}

//Funciones
function agregarTweet(e){
    e.preventDefault();
    
    //textarea donde el usuario escribe
    const tweet =document.querySelector('#tweet').value;

    //validacion
    if (tweet === ""){
        mostrarError('Un mensaje no puede ir vacio');
        return; //evita que se ejecute mas codigo
    }

    const tweetObj = {
        id: Date.now(),
        texto: tweet
    }

    //agregando al array de tweets
    tweets = [...tweets,tweetObj];

    //Una vez agregado vamos a crear el html
    crearHTML();

    //reiniciar el formulario
    formulario.reset();
}

//mostrar error de validacion
function mostrarError (error){
    const mensajeError = document.createElement('p');
    mensajeError.textContent = error;
    mensajeError.classList.add('error');

    //insertar el error en el contenido
    const contenido = document.querySelector('#contenido');
    contenido.appendChild(mensajeError);

    //elimina la alerta despues de 3 segundo
    setTimeout (() => {
        mensajeError.remove();
    }, 3000);
}

//muestra un listado de los tweets
function crearHTML(){
    limpiarHTML();

    if(tweets.length > 0 ) {
        tweets.forEach( tweet =>  {
            //agregar un boton de eliminar
            const btnEliminar = document.createElement('a');
            btnEliminar.classList.add('borrar-tweet');
            btnEliminar.innerText ="X";
            //añadir la funcion de eliminar
            btnEliminar.onclick = () => {
                borrarTweet(tweet.id);
            }

             // Crear elemento y añadirle el contenido a la lista
            const li = document.createElement('li');

             // Añade el texto
            li.innerText = tweet.texto;

            //asigna<r boton
            li.appendChild(btnEliminar);

             // añade el tweet a la lista
            listaTweets.appendChild(li);
        });
    }
    sincronizarStorage();
}

//Agrega los tweets actuales a localStorage

function sincronizarStorage() {
    localStorage.setItem('tweets', JSON.stringify(tweets));
}
//elimando un tweet
function borrarTweet(id){
    tweets = tweets.filter(tweet => tweet.id !== id);
    crearHTML();
}


function limpiarHTML(){
    while (listaTweets.firstChild){
        listaTweets.removeChild(listaTweets.firstChild);
    }
}
