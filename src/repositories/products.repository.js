
import { ProductsDao } from "../DAO/index.js";

export const getProducts = async (limit, page, category, sort, status) => await ProductsDao.getProducts(limit, page, category, sort, status)
export const addProduct = async (product) => await ProductsDao.addProduct(product)
export const getProductById = async (pid) => await ProductsDao.getProductById(pid)
export const updateProduct = async (id, product) => await ProductsDao.updateProduct(id, product)
export const deleteProduct = async (pid) => await ProductsDao.deleteProduct(pid)
export const validateCode = async (code) => await ProductsDao.validateCode(code)
