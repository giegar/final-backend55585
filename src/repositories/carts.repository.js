import { CartsDao } from "../DAO/index.js";

export const getCartById = async (cid) => await CartsDao.getCartById(cid);
export const createCart = async () => await CartsDao.createCart();
export const addProductToCart = async (cid, pid) => await CartsDao.addProductToCart(cid, pid);
export const deleteProductInCart = async (cid, pid) => await CartsDao.deleteProductInCart(cid, pid);
export const updateProductInCart = async (cid, pid, quantity) => await CartsDao.updateProductInCart(cid, pid, quantity);
export const emptyCart = async (cid) => await CartsDao.emptyCart(cid);