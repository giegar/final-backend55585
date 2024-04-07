import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const collection = 'products'

const schemaProd = mongoose.Schema({
    title: { type: String, required: [true, 'title is required'] },
    description: { type: String, required: [true, 'description is required'] },
    category: { type: String, required: [true, 'category is required'] },
    price: { type: Number, required: [true, 'price is required'] },
    thumbnail: [ { type: String } ],
    code: { type: String, unique: true, required: [true, 'code is required'] },
    stock: { type: Number, required: [true, 'stock is required'] },
    status: { type: Boolean, default: true },
    owner: { type: mongoose.Schema.Types.ObjectId, ref:'users', required: [true, 'owner ID is required'] }
})

schemaProd.plugin(mongoosePaginate)

schemaProd.set('toJSON', {
    transform: function(doc,ret){
        delete ret.__v;
        return ret;
    }
})

const ProductModel = mongoose.model(collection, schemaProd)

export default ProductModel