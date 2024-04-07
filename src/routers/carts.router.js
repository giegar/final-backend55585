import { Router } from "express";
import { check } from "express-validator";
import { addProductToCart, createCart, deleteProductInCart, emptyCart, getCartById, purchaseCart, updateProductInCart } from "../controllers/carts.controller.js";
import { validateJWT, validateField } from "../middleware/auth.js";

const cartsRouter = Router();

cartsRouter.get('/:cid', [
    validateJWT,
    check('cid', 'A Cart ID is required').not().isEmpty(),
    check('cid', 'Cart ID non valid').isMongoId(),
    validateField
], getCartById);

cartsRouter.post('/:cid/product/:pid', [
    validateJWT,
    check('pid', 'A product ID is required').not().isEmpty(),
    check('pid', 'Product ID non valid').isMongoId(),
    check('cid', 'A Cart ID is required').not().isEmpty(),
    check('cid', 'Cart ID non valid').isMongoId(),
    validateField
 ], addProductToCart)

cartsRouter.delete('/:cid/product/:pid', [
    validateJWT,
    check('pid', 'A product ID is required').not().isEmpty(),
    check('pid', 'Product ID non valid').isMongoId(),
    check('cid', 'A Cart ID is required').not().isEmpty(),
    check('cid', 'Cart ID non valid').isMongoId(),
    validateField
 ], deleteProductInCart)

cartsRouter.put('/:cid/product/:pid', [
    validateJWT,
    check('pid', 'A product ID is required').not().isEmpty(),
    check('pid', 'Product ID non valid').isMongoId(),
    check('cid', 'A Cart ID is required').not().isEmpty(),
    check('cid', 'Cart ID non valid').isMongoId(),
    validateField
 ], updateProductInCart)

cartsRouter.delete('/:cid', [
    validateJWT,
    check('cid', 'A Cart ID is required').not().isEmpty(),
    check('cid', 'Cart ID non valid').isMongoId(),
    validateField
 ], emptyCart)

cartsRouter.post('/:cid/purchase', [
    validateJWT,
    check('cid', 'A Cart ID is required').not().isEmpty(),
    check('cid', 'Cart ID non valid').isMongoId(),
    validateField
 ], purchaseCart)

 cartsRouter.delete('/:cid', [
    validateJWT,
    check('cid', 'A Cart ID is required').not().isEmpty(),
    check('cid', 'Cart ID non valid').isMongoId(),
    validateField
 ], emptyCart)

export default cartsRouter;