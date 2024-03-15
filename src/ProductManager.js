import { promises as fs } from 'fs';

class ProductManager {
    constructor(path) {

        this.path = path;
        this.products = []

    }
    static id = 0

    //Métodos 

    addProduct(title, description, price, thumbnail, code, stock) {
        if (!title || !description || !price || !thumbnail || !code || !stock) {
            console.log("Todos los campos son obligatorios");
            return;
        }
        if (this.products.some((product) => product.code === code)) {
            console.log("El código debe ser único")
            return;
        }
        const newProduct = {
            id: ++ProductManager.id,
            title,
            description,
            price,
            thumbnail,
            code,
            stock
        }
        this.products.push(newProduct)

        const writeFile = async () => {
            fs.writeFile(this.path, JSON.stringify(this.products, null, 2))
        }
        writeFile();
    }

    
    async getProducts() {
        const resp= await JSON.parse(fs.readFile(this.path, "utf-8"));
        const array = JSON.parse(resp);
        return array;
    }
    getProductbyId(id) {

        if (this.products.find((product) => product.id == id)) {
            const foundedProduct = this.products.find((product) => product.id == id)
            const writeFile = async () => {
                fs.writeFile(this.path, JSON.stringify(foundedProduct, null, 2))
            }
            writeFile();
        }
        else {
            console.log("No existe un producto con ese ID")
        }
    }
    async updateProduct(id) {
        const foundedProduct = this.products.find((product) => product.id == id)
        if (foundedProduct) {
            const updateFile = async () => {
    
                fs.writeFile(this.path, JSON.stringify(this.products, null, 2))
            }
            updateFile();
        }
        else {
            
            console.log("No existe un producto con ese ID,")
        }
    }
    async updateProduct(id,obj) { 

        const db = await this.getProducts()

        const index = db.findIndex(product => product.id == id) 

        console.log({index})

        if (index < 0) {

            console.log("No existe un producto con ese ID,")

        }

        else {


            obj.id=id; 

            db[index] = obj 

            this.products = db 

            fs.writeFile(this.path, JSON.stringify(this.products, null, 2))

        }

    }

    async deleteProduct(id) {
        const foundedProduct = this.products.find((product) => product.id == id)
        if (!foundedProduct) {
            console.log("No existe un producto con ese ID")
        }
        else {
           const otherProducts= this.products.filter((product) => product.id !==id) 
            const writeFile = async () => {
                fs.writeFile(this.path, JSON.stringify(otherProducts, null, 2))
            }
            writeFile();
        }
    }
}


export default ProductManager;