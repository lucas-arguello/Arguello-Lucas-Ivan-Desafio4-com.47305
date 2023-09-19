//este archivo maneja el "js" del lado de "Frontend" de la vista "realtime" 

//Ahora creamos el "socket" del lado del cliente
const socketClient = io();

//Obtenemos los elementos a manipular en el HTML por medio de su "id".
const productList = document.getElementById("productList")
const createProductFrom = document.getElementById("createProductFrom")

//1ro. a los elementos del form, le agregamos el evento "submit",
//y capturamos la info del form. en una funcion
createProductFrom.addEventListener("submit", (e) => {
    
    e.preventDefault();
    console.log(e);

});
//ahora enviamos la info del formulario al socket del servidor


//recibimos los productos desde el server de websocket.

socketClient.on("productsArray", (dataProdcuts) => {
    //console.log(dataProdcuts);
    let productsElems= "";
    //Iteramos en el array de productos creamos una lista.
    dataProdcuts.forEach(prod =>{ 
        productsElems+= 
        ` <li>
                <p>Nombre : ${prod.title}</p>
          </li> `
          //console.log(productsElems);
          });
    //inserto la lista de productos en el HTML de "realtime.hbs"      
    productList.innerHTML= productsElems;
});