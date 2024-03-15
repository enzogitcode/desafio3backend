const PUERTO = 8080;
import express from "express";
const app = express();
import ProductManager from "./ProductManager.js";
const productManager = new ProductManager('./src/fileproducts.json')
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.get("/products", async (req, res) => {
    try {
        const limit = req.query.limit;
        const products = await productManager.getProducts();
        if (limit) {
            res.json(products.slice(0, limit));
        }
        else {
            res.json(products);
        }


    } catch (error) {
        console.log("error", error)
    }
})

app.get("/products/:pid", async (req, res) => {

    const id = req.params.pid;

    try {

        const product = await productManager.getProductbyId(parseInt(id));
        if (!product) {
            return res.json({
                error: "Producto no encontrado"
            });
        }

        res.json(producto);
    } catch (error) {
        console.error("Error", error);
        
    }
})

app.listen(PUERTO, async (req, res) => {
    console.log(`esta aplicación funciona en el puerto ${PUERTO}`)
})