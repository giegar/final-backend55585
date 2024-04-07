import * as ProductsRepository from "../repositories/products.repository.js"
import * as CartsRepository from "../repositories/carts.repository.js"

export const validateStock = async (products = []) => {
    try {
        const newP = [];
        const calls = products.map(p => ProductsRepository.getProductById(p.id));
        const result = await Promise.all(calls)

        const prodQuantity = result.map((p, index) => ({
            ...p.toObject(),
            quantity:products[index].quantity
        }))

        console.log(newP)
    } catch(error) {
        console.log("validateStock ->", error)
    }
}