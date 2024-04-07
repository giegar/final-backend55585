import mongoose from "mongoose";

const collection = 'tickets'

const ticketSchema = mongoose.Schema({
    code: { type: String, require: [true, 'the code is required'] },
    purchase_date: { type: Date, default: Date.now },
    purchase: { type: String, required: [true, 'a purchase email is required'] } ,
    products: { type: Object, required: [true, 'at least 1 product is required']},
    amount: {type: Number, required: [true, 'total amount is required']},
})

ticketSchema.set('toJSON', {
    transform: function (doc, ret) {
        delete ret.__v;
        return ret;
    }
})

const TicketModel = mongoose.model(collection, ticketSchema)

export default TicketModel