import express from "express" // importamos el modulo "express" para poder usar sus metodos.
import { __dirname } from "./utils.js";//importamos la variable "__dirname" que va servir como punto de acceso a los arch. desde "src"
import path from "path";

import {engine} from "express-handlebars";
import {Server} from "socket.io";

import { productsRouter } from "./routes/products.routes.js";// importamos la ruta "products"
import { cartsRouter } from "./routes/carts.routes.js";// importamos la ruta "carts"
import { viewsRouter } from "./routes/views.routes.js";//importamos las rutas de las vistas.

const port = 8080; //creamos el puerto de acceso, donde se va ejecutar el servidor.

const app = express(); //creamos el servidor. Aca tenemos todas las funcionalidades que nos ofrece el modulo "express".

//configuramos websockets del lado del servidor (backend), vinculando el servidor http con el servidor de websocket.
//servidor de http
const httpServer = app.listen(port, () => console.log(`Servidor OK, puerto: ${port}`)); //con el metodo "listen" escuchamos ese punto de acceso "8080"
//servidor de websocket
const io = new Server(httpServer)

//configuracion de Handlebars
app.engine('hbs', engine({extname:'.hbs'}));
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname,'/views') ); 

app.use(express.json());
app.use(express.urlencoded({extended:true}))

//vinculamos las rutas con nuestro servidor con el metodo "use". Son "Middlewares", son funciones intermadiarias.
app.use(viewsRouter); //contiene rutas de tipo GET, porque son las que van a utilizar los usuarios en el navegador.
app.use("/api/products",productsRouter);
app.use("/api/carts",cartsRouter);



//convertimos los archivos contenidos en la carpeta "public", osea de acceso publico para los clientes.
// app.use(express.static("public"));

//Estas 2 lineas codigo nos permiten convertir la info. (recibida en las peticiones) a formato json.
