import fs from "fs";// importamos el modulo "fs" file system, para que funcionen las funciones asincronas.
import {Router} from "express";//importamos "routes" desde la libreria de express, para poder realizar el ruteo de los metodos.
import { productsService } from "../persistence/index.js";//importamos la instancia del Manager de productos, para poder usar los diferentes metodos que definimos dentro de la clase.



const router = Router();


//Usamos el metodo GET para crear una ruta que nos permita obtener el listado de todos los productos.
router.get("/", async (req,res) => {
    try{

        const products = await productsService.getProducts();
        const limit = req.query.limit;//creamos el query param "limit".
        
        const limitNum = parseInt(limit);//convertimos a "limit" de string a numero

        
        if(limit){
            //utilizamos el metodo "slice" para obtener una parte del arreglo segun el numero limite que elija el cliente.
            const productsLimit = products.slice(0,limitNum);
            res.json(productsLimit);
            
           }else{
               //respondemos la peticion enviando el contenido guardado en prodcuts
               res.json(products)
            
           }
        

        res.json({message:"Listado de productos", data:products});

    }catch(error){
        //respuesta para que el cliente sepa que la peticion no fue resuelta correctamente
        res.json({status:"error",message: error.message}) 
    };
});

//Usamos el metodo GET para crear una ruta que nos permita obtener un solo producto.

router.get("/:pid", async (req,res) => {
    try{
        //parseamos el valor recibido (como string) de la peticion, a valor numerico, para poder compararlo.
        const productId = parseInt(req.params.pid);
        //con el "productService", llamamos el metodo "getProductById" y le pasamos el Id que habiamos parseado. 
        const product = await productsService.getProductById(productId);
        res.json({message:"El producto seleccionado es: ", data:product});
    
    }catch(error){
        //respuesta para que el cliente sepa que la peticion no fue resuelta correctamente
        res.json({status:"error",message: error.message}) 
    };
    
});

//Usamos el metodo POST para crear una ruta que nos permita crear un producto.
router.post("/", async (req,res) => {
    try{
        const productInfo = req.body; //captamos la info del nuevo producto.
        
        //Validamos si NO se esta recibiendo INFO del producto en la variable "productInfo", y mostramos el error.
        if (!productInfo) {
            throw new Error("La solicitud está vacía");
        }
        //con la info. recibida de la peticion POST, creamos el producto con el metodo "createProduct".
        const newProduct = await productsService.createProduct(productInfo);
        
        res.json({message:"El producto fue creado correctamente", data:newProduct});

    }catch(error){
        //respuesta para que el cliente sepa que la peticion no fue resuelta correctamente
        res.json({status:"error",message: error.message}) 
    };

});

//Usamos el metodo PUT para crear una ruta que nos permita modificar un producto.
router.put("/:pid", async (req,res) => {
    try {
        const productId = parseInt(req.params.pid);
        const updatedFields = req.body;
        await productsService.updateProduct(productId, updatedFields);
        res.json({ message: "Producto actualizado correctamente" });
    } catch (error) {
        res.json({ status: "error", message: error.message });
    }
});




//Usamos el metodo DELETE para crear una ruta que nos permita eliminar un producto.
router.delete("/:pid", async (req,res) => {
    try {
        const productId = parseInt(req.params.pid);
        await productsService.deleteProduct(productId);
        res.json({ message: "Producto eliminado correctamente" });
    } catch (error) {
        res.json({ status: "error", message: error.message });
    }

});

export {router as productsRouter}; //exportamos la ruta hacia la "app.js".