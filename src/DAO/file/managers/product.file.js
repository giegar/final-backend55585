import fs from "fs";

class ProductManager {

    constructor(path){
        this.path = path;
        this.products = this.readProducts();

    };
    readProducts(){
        try {
            const existFile = fs.existsSync(this.path);

            if (!existFile) {
                this.products = [];
                fs.writeFileSync(this.path, JSON.stringify(this.products))

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
            fs.writeFileSync(this.path, JSON.stringify(this.products))
        } catch(error) {
            console.log(`Error writing the file: ${error}`)
        }

    };
    addProduct( {title, description, price, thumbnail=[], code, stock, category, status = true}){

        this.readProducts();

        if(!title || !description || !price || !code || !stock || !category)
        return 'title, description, price, code, stock and category are required';

        const codeExist = this.products.some(p => p.code == code)
        if (codeExist) return `Code ${code} already exists`;

        const newProduct = {
            id: this.products.length + 1,
            title,
            description,
            price,
            thumbnail,
            code,
            stock,
            category,
            status
        }
        
        this.products.push(newProduct);
        this.writeFile();

        return newProduct;

    };
    updateProduct(id, productChanges){

        const index = this.products.findIndex(p => p.id === id)

        if(index !== -1){
            const {id, ...rest} = productChanges;

            const properties = ['title', 'description', 'price', 'thumbnails', 'code', 'stock', 'category', 'status'];
            const newProperties = Object.keys(rest)
                .filter(prop => properties.includes(prop))
                .reduce((obj, key) => {
                    obj[key] = rest[key]
                    return obj;
                }, {});

            this.products[index] = {...this.products[index], ...newProperties}
            this.writeFile();

            const result = {
                msg: `Product updated`,
                product: this.products[index]
            }

            return result;
        }

        return `Product id ${id} not found`;

    };
    getProducts(limit){
        limit = Number(limit);

        if (limit > 0) {
            return this.products.slice(0, limit)
        }

        const products = this.readProducts()
        return products;

    };
    getProductById(id){
        this.readProducts();

        const product = this.products.find(p => p.id == id)
        if(product) return product
        else return `Product id ${id} not found`;

    };
    deleteProduct(id){
        const idExist = this.products.some(p => p.id == id)

        if (idExist) {
            this.products = this.products.filter((prod) => prod.id != id)
            this.writeFile()
            return `Product id ${id} deleted`;
        }

        return `Product id ${id} not found`;

    };
}

export default ProductManager; 

