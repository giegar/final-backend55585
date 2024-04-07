import mongoose from "mongoose";

const collection = "carts"

const schemaCart = new mongoose.Schema({

    products: [
        {
            _id: false,
            id: {
                type: mongoose.Schema.Types.ObjectID,
                ref: 'products'
            },
            quantity:{
                type:Number,
                required: [true, 'quantity is required']
            }
        }
    ]
})

schemaCart.set('toJSON', {
    transform: function(doc,ret){
        delete ret.__v;
        return ret;
    }
})

const CartModel = mongoose.model(collection, schemaCart);

export default CartModel;