import CartModel from "../models/carts.model.js";
import ProductModel from "../models/products.model.js";

    export const createCart = async () => {
        
             const cart = {
                products: []
            }

            const newCart = await CartModel.create(cart)
            return { status:'Cart created', res: newCart }
    };

    export const getCarts = async () => {

            const carts = await CartModel.find()
            return carts;
    };

    export const getCartById = async (cid) => {

            const cart = await CartModel.findById(cid).populate('products.id', ['title', 'category', 'price', 'stock']);
   
            if (!cart) return "Cart not found";
            return cart;
            
    };

    export const addProductToCart = async (cid, pid) => {

        const productById = await ProductModel.findById(pid);
        if (!productById) return "Product not found"
    
        const cartById = await CartModel.findById(cid)
        if (!cartById) return "Cart not found"
    
        const productExists = cartById.products.find(p => p.id.toString() === pid)
    
        if (productExists) {
            productExists.quantity++;
        } else {
            cartById.products.push({ id: pid, quantity: 1})
            }
    
        await cartById.save()
        return await CartModel.findById(cid);
    };

    export const deleteProductInCart = async (cid, pid) => {

        const cart = await CartModel.findById(cid);
        if (!cart) return 'Cart not found'

        const product = await ProductModel.findById(pid);
        if (!product) return "Product not found"

        return await CartModel.findByIdAndUpdate(cid, {$pull:{'products':{ id:pid } } }, { new: true })
       
    }

    export const updateProductInCart = async (cid, pid, quantity) => {

        const cart = await CartModel.findById(cid);
        if (!cart) return 'Cart not found'

        const product = await ProductModel.findById(pid);
        if (!product) return "Product not found" 

        await CartModel.findOneAndUpdate(
            { _id: cid, 'products.id': pid },
            { $set: {'products.$.quantity': quantity} },
            { new: true }
        );
        
        return await CartModel.findById(cid);
    }

    export const emptyCart = async (cid) => {

        const cart = await CartModel.findById(cid);
        if (!cart) return 'Cart not found'

        await CartModel.findByIdAndUpdate(cid, { $set: { 'products': [] } }, { new: true });
        return await CartModel.findById(cid);
    }
    
