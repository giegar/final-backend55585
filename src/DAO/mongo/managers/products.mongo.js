import ProductModel from "../models/products.model.js";

    export const validateCode = async (code) => {

            const data = await ProductModel.find()
            return data.some((product) => product.code == code)
    };

    export const getProducts = async ({ limit = 10, page = 1, category, sort = 'asc', status = true }) => {

            const filter = {
                ...(category && { category }),
                ...(status && { status })
            }
            
            const options = {
                limit,
                page,
                lean: true
            } 

            if(sort) options["sort"] = { price: sort }

            const pageResults = await ProductModel.paginate(filter, options)

            return {
                    status: "Success",
                    payload: pageResults.docs,
                    totalDocs: pageResults.totalDocs,
                    totalPages: pageResults.totalPages,
                    page: pageResults.page,
                    limit: pageResults.limit,
                    sort: sort,
                    hasPrevPage: pageResults.hasPrevPage,
                    hasNextPage: pageResults.hasNextPage,
                    prevPage: pageResults.prevPage,
                    nextPage: pageResults.nextPage,
                    prevLink: `http://localhost:8080/products/?page=${pageResults.prevPage}&limit=${pageResults.limit}&sort=${sort}`,
                    nextLink: `http://localhost:8080/products/?page=${pageResults.nextPage}&limit=${pageResults.limit}&sort=${sort}`
                }
    };

    export const addProduct = async (product) => {

            const { title, description, price, thumbnail, code, stock, owner } = product;

            const validate = await validateCode(product.code)
            if (validate) return "Code already exists";

            if (!title || !description || !price || !code || !stock || !owner){
                return "Please, complete all fields";
            }

            const create = await ProductModel.create(product)
            return create;

    };

    export const getProductById = async (pid) => { return await ProductModel.findById(pid) };

    export const updateProduct = async (id, product) => {

            const validateID = await ProductModel.findById(id)
            if (!validateID) return "Invalid ID"

            const validateCod = await validateCode(product.code)
            if (validateCod) return "Code already exists"

            const updatedProduct = await ProductModel.updateOne({_id: id}, {$set: product})
            if (updatedProduct) return "Product updated succesfully";
    };

    export const deleteProduct = async (pid) => { return await ProductModel.deleteOne({ _id: pid }) };


