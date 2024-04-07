import { Router } from "express";
import { check } from "express-validator";
import { addProduct, deleteProduct, getProductById, getProducts, updateProduct } from "../controllers/products.controller.js";
import { admin, validateField, validateJWT } from "../middleware/auth.js";

const productsRouter = Router();

productsRouter.post('/', [
    validateJWT,
    admin, 
    // check('title', 'A title is required').not().isEmpty(),
    // check('description', 'A description is required').not().isEmpty(),
    // check('category', 'A category is required').not().isEmpty(),
    // check('price', 'Price is required and must be a number').not().isEmpty().isNumeric(),
    // check('stock', 'Stock is required and must be a number').not().isEmpty().isNumeric(),
    // check('code', 'Code is required').not().isEmpty(),
    //validateField
], addProduct)

productsRouter.get('/', getProducts)

productsRouter.get('/:pid', [
    validateJWT,
    check('pid', 'A product ID is required').not().isEmpty(),
    check('pid', 'Product ID non valid').isMongoId(),
    validateField
], getProductById)

productsRouter.put('/:pid', [
    validateJWT,
    admin, 
    check('pid', 'A product ID is required').not().isEmpty(),
    check('pid', 'Product ID non valid').isMongoId(),
    validateField
], updateProduct)

productsRouter.delete('/:pid', [ 
    validateJWT,
    admin,
    check('pid', 'A product ID is required').not().isEmpty(),
    check('pid', 'Product ID non valid').isMongoId(),
    validateField
], deleteProduct)

export default productsRouter;