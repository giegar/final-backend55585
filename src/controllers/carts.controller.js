import * as CartsRepository from "../repositories/carts.repository.js";
import * as UsersRepository from "../repositories/users.repository.js";
import * as ProductsRepository from "../repositories/products.repository.js"
import * as TicketRepository from "../repositories/ticket.repository.js"
import { generateCode } from "../utils.js";

export const createCart = async (req, res) => {
    try {
        const result = await CartsRepository.createCart()
        return res.json({ result });

    } catch(error) {
        console.log('controller createCart ->', error)
        return res.status(500).json({ msg: `${error}` })
    }
}
export const getCartById = async (req, res) => {
    try {
        const { _id } = req;
        const { cid } = req.params;

        const user = await UsersRepository.getUserById(_id);
        if (!user) return res.status(400).json({ ok: false, msg: 'User does not exist' });

        if (user.cartId.toString() !== cid) return res.status(400).json({ ok: false, msg: 'Non valid cart' });

        const cart = await CartsRepository.getCartById(cid);

        return res.json({ cart });
        
    } catch(error) {
        console.log('controller getCartById ->', error);
        return res.status(500).json({ msg: `${error}` });
    }
}
export const addProductToCart = async (req, res) => {
    try {
        const { _id } = req;
        const { cid, pid } = req.params;

        const user = await UsersRepository.getUserById(_id);
        if (!user) return res.status(400).json({ ok: false, msg: 'User does not exist' });

        if (user.cartId.toString() !== cid) return res.status(400).json({ ok: false, msg: 'Non valid cart' });

        const productById = await ProductsRepository.getProductById(pid);
        if (!productById) return res.status(400).json({ ok: false, msg: `Product with ID ${pid} does not exist` });

        const result = await CartsRepository.addProductToCart(cid, pid);
        if (!result) return res.status(400).json({ ok: false, msg: 'Cart does not exist' });

        return res.json({ ok: true, msg: 'Updated cart', result });

    } catch(error) {
        console.log('controller addProductToCart ->', error);
        return res.status(500).json({ msg: `${error}` });
    }
}
export const deleteProductInCart = async (req, res) => {
    try{
        const { _id } = req;
        const { cid, pid } = req.params;

        const user = await UsersRepository.getUserById(_id);
        if (!user) return res.status(400).json({ ok: false, msg: 'User does not exist' });

        if (user.cartId.toString() !== cid) return res.status(400).json({ ok: false, msg: 'Non valid cart' })

        const productById = await ProductsRepository.getProductById(pid);
        if (!productById) return res.status(400).json({ ok: false, msg: `Product with ID ${pid} does not exist` })

        const result = await CartsRepository.deleteProductInCart(cid, pid)
        if(!result) return res.status(404).json({ ok: false, msg: `Product with ID ${pid} was not deleted. Please contact our user support.` })

        return res.json({ ok: true, msg: 'The product was removed from the cart', result })

    } catch(error) {
        console.log('controller deleteProductInCart ->', error)
        return res.status(500).json({ msg: `${error}` })
    }
}
export const updateProductInCart = async (req, res) => {
    try{
        const { _id } = req;
        const { cid, pid } = req.params;
        const { quantity } = req.body;

        const user = await UsersRepository.getUserById(_id);
        if (!user) return res.status(400).json({ ok: false, msg: 'User does not exist' });

        if (user.cartId.toString() !== cid) return res.status(400).json({ ok: false, msg: 'Non valid cart' })

        const productById = await ProductsRepository.getProductById(pid);
        if (!productById) return res.status(400).json({ ok: false, msg: `Product with ID ${pid} does not exist` })

        if (!quantity || !Number.isInteger(quantity)) return res.status(404).json({msg: 'Quantity is required and must be an integer number'})

        const result = await CartsRepository.updateProductInCart(cid, pid, quantity)
        if(!result) return res.status(404).json({ ok: false, msg: `Product with ID ${pid} was not updated. Please contact our user support.` })

        return res.json({ ok: true, msg: 'The product was removed from the cart', result })

    } catch(error) {
        console.log('controller updateProductInCart ->', error)
        return res.status(500).json({ msg: `${error}` })
    }
}
export const emptyCart = async (req, res) => {
    try{
        const { _id } = req;
        const { cid } = req.params;

        const user = await UsersRepository.getUserById(_id);
        if (!user) return res.status(400).json({ ok: false, msg: 'User does not exist' });

        if (user.cartId.toString() !== cid) return res.status(400).json({ ok: false, msg: 'Non valid cart' })

        const result = await CartsRepository.emptyCart(cid)
        if (!result) return res.status(404).json({ ok: false, msg: `Cart with ID ${cid} was not emptied. Please contact our user support.` })

        return res.json({ ok: true, msg: 'The cart is empty', result })

    } catch(error) {
        console.log('controller emptyCart ->', error)
        return res.status(500).json({ msg: `${error}` })
    }
}
export const purchaseCart = async (req, res) => {
    try{
        const { _id } = req;
        const { cid } = req.params;

        const user = await UsersRepository.getUserById(_id);
        if (!user) return res.status(400).json({ ok: false, msg: 'User does not exist. Please log in or register' });

        const cart = await CartsRepository.getCartById(cid);
        if (!cart) return res.status(400).json({ ok: false, msg: 'cart does not exist' });

        if (user.cartId.toString() !== cid) return res.status(400).json({ ok: false, msg: 'Non valid cart' })
        if (!(cart.products.length > 0)) return res.status(400).json({ ok: false, msg: 'Cart is empty' });

        const stockProducts = cart.products.filter(p => p.id.stock >= p.quantity)

        const updateStock = stockProducts.map(p => ProductsRepository.updateProduct(p.id._id, { stock: p.id.stock - p.quantity }))
        const result = await Promise.all(updateStock)

        const products =  stockProducts.map(i => ({
             title: i.id.title,
             price: i.id.price,
             quantity: i.quantity,
             subtotal: i.id.price * i.quantity
        }))
        const purchase = user.email
        const code = generateCode();

        let amount = 0;
        products.forEach(product => { amount = amount + product.subtotal })

        const ticket = await TicketRepository.createTicket({ purchase, amount, products, code })

        await CartsRepository.emptyCart(cid);
        return res.json({ ok: true, msg: 'ticket created', ticket: { code, client: purchase, totalAmount: amount, products } })

    } catch(error){
        return res.status(500).json({ ok: false, msg: `The transaction was not successful. Please contact our user support.` })
    }
}