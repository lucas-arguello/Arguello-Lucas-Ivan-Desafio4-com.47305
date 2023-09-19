import express from "express" // importamos el modulo "express" para poder usar sus metodos.
import { __dirname } from "./utils.js";//importamos la variable "__dirname" que va servir como punto de acceso a los arch. desde "src"
import path from "path";
import { productsService } from "./persistence/index.js";

import {engine} from "express-handlebars";
import {Server} from "socket.io";

import { productsRouter } from "./routes/products.routes.js";// importamos la ruta "products"
import { cartsRouter } from "./routes/carts.routes.js";// importamos la ruta "carts"
import { viewsRouter } from "./routes/views.routes.js";//importamos las rutas de las vistas.

const port = 8080; //creamos el puerto de acceso, donde se va ejecutar el servidor.

const app = express(); //creamos el servidor. Aca tenemos todas las funcionalidades que nos ofrece el modulo "express".

//middleware para hacer accesible la carpeta "public" para todo el proyecto.
app.use(express.static(path.join(__dirname,"/public")));

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

//socket server- enviamos del servidor al cliente los productos creados hasta el momentopermitimos una actualizacion 
//automatica de los productos creados. Y tambien importamos "productService" para disponer de los productos.
io.on("connection", async (socket)=> {
    console.log("cliente conectado")

    try{
        //Obtengo los productos 
        const products = await productsService.getProducts();
        //y los envio al cliente
        socket.emit("productsArray", products)

        } catch (error) {
            console.log('Error al obtener los productos', error.message);
            
        }
    

//Recibimos los productos desde el socket del cliente.
    socket.on("addProduct",async (productData) =>{
        try{    
            //creamos los productos
            const createProduct = await productsService.createProduct(productData);
            //obtenemos los productos
            const products = await productsService.getProducts();
            //mostramos los productos
            io.emit("productsArray", products)

        } catch (error) {
            console.error('Error al crear un producto:', error.message);
        }    
    });

//Eliminamos los produtos.

    socket.on('deleteProduct', async (productId) => {
        try {
            // Eliminar el producto de la lista de productos por su ID
            await productsService.deleteProduct(productId);
            // Obtener la lista actualizada de productos
            const updatedProducts = await productsService.getProducts();
            // Emitir la lista actualizada de productos al cliente
            socket.emit('productsArray', updatedProducts);
        } catch (error) {
            // Manejar errores, por ejemplo, si el producto no se encuentra
            console.error('Error al eliminar un producto:', error.message);
        }
    });
});





