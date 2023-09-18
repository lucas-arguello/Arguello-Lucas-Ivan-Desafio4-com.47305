//Aca importamos los Managers para crear nuestros servicios, instanciando a cada modulo y le pasamos el "path",
//y los exportamos para poder utilizarlos otras partes del codigo.

import { ProductsManager } from "./files/productsManager.js";
import { CratsManager } from "./files/cartsManager.js";

import { __dirname } from "../utils.js"; //importamos la variable "__dirname" para tener disponible un punto de referencia de nuestros archivos.
import path from "path"; //instalamos esta libreria de Nodejs que ya viene integrada. Me ayuda a unir diferentes rutas.

export const productsService = new ProductsManager(path.join(__dirname,"/data/products.json"));
export const cartsService = new CratsManager(path.join(__dirname,"/data/carts.json"));