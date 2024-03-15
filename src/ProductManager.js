import {promises as fs} from 'fs';
const fileProducts = './fileproducts.json'
class ProductManager {
    static ultId = 0
    constructor() {

        this.path = fileProducts;
        this.products = []

    }

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
            id: ++ProductManager.ultId,
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

    getProducts() {
        return JSON.parse(fs.readFile(this.path, "utf-8"));

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

//Testing
const manager = new ProductManager()

manager.addProduct('Cable Vga', 'Cable Vga 20 Metros Blindado Macho Doble Filtro Cobre 100', 23759, 'sin imagen', 'abc123', 25)
manager.addProduct('Cable usb', 'Este es un producto prueba', 200, 'sin imagen', 'abc124', 25)
manager.addProduct('Cable usb', 'Este es un producto prueba', 200, 'sin imagen', 'abc125', 25)
manager.addProduct('Cable usb', 'Este es un producto prueba', 200, 'sin imagen', 'abc126', 25)
manager.addProduct('Cable usb', 'Este es un producto prueba', 200, 'sin imagen', 'abc127', 25)
manager.addProduct('Cable usb', 'Este es un producto prueba', 200, 'sin imagen', 'abc128', 25)
manager.addProduct('Cable usb', 'Este es un producto prueba', 200, 'sin imagen', 'abc129', 25)
manager.addProduct('Cable usb', 'Este es un producto prueba', 200, 'sin imagen', 'abc130', 25)
manager.addProduct('Cable usb', 'Este es un producto prueba', 200, 'sin imagen', 'abc131', 25)
manager.addProduct('Cable usb', 'Este es un producto prueba', 200, 'sin imagen', 'abc132', 25)
manager.addProduct('Cable usb', 'Este es un producto prueba', 200, 'sin imagen', 'abc133', 25)

export default ProductManager;