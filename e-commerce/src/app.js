import express from "express" // importamos el modulo "express" para poder usar sus metodos.

import { productsRouter } from "./routes/products.routes.js";// importamos la ruta "products"
import { cartsRouter } from "./routes/carts.routes.js";// importamos la ruta "carts"

const port = 8080; //creamos el puerto de acceso, donde se va ejecutar el servidor.

const app = express(); //creamos el servidor. Aca tenemos todas las funcionalidades que nos ofrece el modulo "express".

app.listen(port, () => console.log("Servidor OK")); //con el metodo "listen" escuchamos ese punto de acceso "8080"

app.use(express.json());
app.use(express.urlencoded({extended:true}))

//vinculamos las rutas con nuestro servidor con el metodo "use". Son "Middlewares", son funciones intermadiarias.
app.use("/api/products",productsRouter);

app.use("/api/carts",cartsRouter);



//convertimos los archivos contenidos en la carpeta "public", osea de acceso publico para los clientes.
// app.use(express.static("public"));

//Estas 2 lineas codigo nos permiten convertir la info. (recibida en las peticiones) a formato json.
