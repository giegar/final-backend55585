import fs from "fs";
import ProductManager from "./product.file.js";

const products = new ProductManager("./src/DAO/file/data/products.json")

class CartManager {

    constructor(path){
        this.path = path;
        this.carts = this.readCarts();

    };
    readCarts(){
        try {
            const existFile = fs.existsSync(this.path);

            if (!existFile) {
                this.carts = [];
                fs.writeFileSync(this.path, JSON.stringify(this.carts))

            } else {
                const data = fs.readFileSync(this.path, "utf-8");
                return JSON.parse(data);
            }
        } catch(error){
            console.log(`Error reading the file: ${error}`)
        }

    };
    writeFile(){
        try{
            fs.writeFileSync(this.path, JSON.stringify(this.carts))
        } catch(error) {
            console.log(`Error writing the file: ${error}`)
        }

    };
    createCart(){
        const newCart = {
            id: this.carts.length + 1,
            products: []
        };

        this.carts.push(newCart);
        this.writeFile();

        return newCart

    };
    addProductToCart(cid, pid){

        // busco el carrito por id
            let cartById = this.getCartById(cid);
            if (!cartById) return "Cart not found"

        // busco el producto por id
            let productById = products.getProductById(pid);
            if (!productById) return "Producto not found"

        // creo un array de carritos sin el carrito a actualizar
            let cartsAll =  this.carts;
            let cartFilter = cartsAll.filter(c => c.id != cid)

        // busco el producto dentro del carrito a actualizar    

            let prodExist = cartById.products.some(p => p.id == pid)
            
            if (prodExist) {

            // si el producto esta en el carrito, le sumo 1    
                let productInCart = cartById.products.find(p => p.id == pid)
                productInCart.quantity++
                productInCart.total = productById.price * productInCart.quantity
            // agrego el carrito actualizado al array con el resto de carritos    
                cartFilter.push(cartById)
                this.carts = cartFilter
            // actualizo la base de datos    
                this.writeFile(this.path, JSON.stringify(this.carts))

                return cartById;

            } else {

            // si el producto no existe en el carrito, lo agrego al array de productos
                let product = {"id": productById.id, "unit price": productById.price, "quantity": 1, "total": productById.price};
                let productsArray = cartById.products
                productsArray.push(product)

                let cartWithProd = {
                    id: cartById.id,
                    products: [...productsArray]
                }
                    
                // agrego el carrito actualizado al array con el resto de carritos
                cartFilter.push(cartWithProd)
                this.carts = cartFilter
                // actualizo la base de datos
                this.writeFile(this.path, JSON.stringify(this.carts))

                return cartWithProd;
            }  

    };
    getCarts(limit){
        limit = Number(limit);

        if (limit > 0) {
            return this.carts.slice(0, limit)
        }

        const carts = this.readCarts()
        return carts;

    };
    getCartById(id){
        this.readCarts();

        const cart = this.carts.find(p => p.id == id)
        if(cart) return cart
        else return `cart id ${id} not found`;

    };
    deleteCart(id){
        const idExist = this.carts.some(p => p.id == id)

        if (idExist) {
            this.carts = this.carts.filter((prod) => prod.id != id)
            this.writeFile()
            return `Cart id ${id} deleted`;
        }

        return `Cart id ${id} not found`;

    };
}

export default CartManager; 

