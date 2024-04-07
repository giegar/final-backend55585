import * as ProductsRepository from "../repositories/products.repository.js"

export const getProducts = async (req, res) => {
    try {
        const result = await ProductsRepository.getProducts({...req.query});
        return res.json({ result })

    } catch(error) {
        console.log('getProducts controller ->', error)
        return res.status(500).json({ msg: `${error}` })
    }
}

export const getProductById = async (req, res) => {
    try {
        const { pid } = req.params

        const product = await ProductsRepository.getProductById(pid);
        return res.json({ product })

    } catch(error) {
        console.log('getProductById ->', error)
        return res.status(400).json({ msg: `${error}` })
    }
}

export const addProduct = async (req, res) => {
    try {
        const { title, description, price, code, stock, category } = req.body;
        const { _id } = req;

        if (!title || !description || !price || !code || !stock || !category)
            return res.status(400).json({ ok: false, msg: `All fields are required` });
        
        const codeExists = await ProductsRepository.validateCode(req.body.code);
        if (codeExists) return res.status(400).json({ ok: false, msg: `The code ${req.body.code} is already in use` });

        req.body.owner = _id
        const product = await ProductsRepository.addProduct({...req.body})
        return res.json({ product })

    } catch(error) {
        console.log('addProduct ->', error)
        return res.status(400).json({ msg: `${error}` })
    }
}

export const deleteProduct = async (req, res) => {
    try {
        const { pid } = req.params;
        const { rol, _id } = req;

        if (rol !== 'premium') return res.status(400).json({ ok: false, msg: `You do not have permissions to delete products` });

        const product = await ProductsRepository.getProductById(pid);
        if (!product) return res.status(400).json({ ok: false, msg: `The product with ID ${pid} does not exist` });

        if (!(product.owner.toString() === _id)) return res.status(400).json({ ok: false, msg: `You must be the owner of the product to delete it` });

        const result = await ProductsRepository.deleteProduct(pid);
        return res.json({ result, product })

    } catch(error) {
        return res.status(400).json({ msg: `${error}` })
    }
}

export const updateProduct = async (req, res) => {
    try {
        const { pid } = req.params;
        const {_id, ...rest} = req.body;

        const product = await ProductsRepository.getProductById(pid);
        if (!product) return res.status(400).json({ ok: false, msg: `The product with ID ${pid} does not exist` });

        const result = await ProductsRepository.updateProduct(pid, {...rest})
        return res.json({ result })

    } catch(error) {
        console.log('updateProduct ->', error)
        return res.status(400).json({ msg: `${error}` })
    }
}