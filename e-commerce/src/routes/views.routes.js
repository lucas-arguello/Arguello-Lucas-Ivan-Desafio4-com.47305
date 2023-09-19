import {Router} from "express";//importamos "routes" desde la libreria de express
import { productsService } from "../persistence/index.js";


const router = Router();

router.get("/", async (req,res)=>{
    try{
            const products = await productsService.getProducts();
            console.log(products)
            //aca renderizamos la vista del "home", y le pasamos un objeto con los datos de nuestros productos y los enviamos al "home.hbs".
            res.render("home", {products: products});

        } catch (error) {
            res.status(500).json({ message: error.message }); 
        }

});

//ruta que esta vinculada al servidor de "websocket"
router.get("/realtimeproducts", (req,res)=>{
    try{    
            //aca renderizamos la vista del "realtime".
            res.render("realtime")

        } catch (error) {
            res.status(500).json({ message: error.message });        
        }

});

export {router as viewsRouter};//lo exportamos para poder importarlo en "app.js".
