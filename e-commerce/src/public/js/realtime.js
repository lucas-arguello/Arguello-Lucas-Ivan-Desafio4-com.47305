//este archivo maneja el "js" del lado de "Frontend" de la vista "realtime" 

//Ahora creamos el "socket" del lado del cliente
const socketClient = io();

//Obtenemos los elementos a manipular en el HTML por medio de su "id".
const productList = document.getElementById("productList")
const createProductForm = document.getElementById("createProductForm")

//1ro. a los elementos del form, le agregamos el evento "submit",
//y capturamos la info del form. en una funcion, para poder enviar la info al servidor.
createProductForm.addEventListener("submit",(e)=>{
    
    e.preventDefault();
    //console.log(e);
    //en esta variable capturamos todos los campos del formulario.
    const formData = new FormData(createProductForm);
    // console.log(formData.get("title"))
    //creamos el objeto JSON que vamos enviar con la Data, e iteramos con un (for- of) un arreglo, para crear un objeto
    const jsonData = {};
    for(const [key,value] of formData.entries()){
        jsonData[key]=value
    }; 
    jsonData.stock = parseInt(jsonData.stock);
    jsonData.price = parseInt(jsonData.price);
    console.log(jsonData);
    //ahora enviamos la info del formulario (jsonData) al socket del servidor
    socketClient.emit("addProduct", jsonData);
    //con el metodo "reset" hacemos vacios los campos una vez enviado el producto.
    createProductForm.reset();
});




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