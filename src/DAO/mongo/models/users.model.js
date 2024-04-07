import mongoose, { SchemaTypes } from "mongoose";

const collection = 'users'

const schemaUsers = mongoose.Schema({
    name: {type: String, required: [true, 'name is required']},
    lastname: {type: String},
    email: {type: String, unique: true, required: [true, 'email is required']},
    password: {type: String, required: [true, 'password is required']},
    rol: {type: String, default: 'user', enum: ['user', 'admin', 'premium']},
    avatar: {type: String},
    github: {type: Boolean, default: false},
    status: {type: Boolean, default: true},
    last_login: {type: Date, default: Date.now},
    cartId: {type:SchemaTypes.ObjectId, ref:'carts'}
})

schemaUsers.set('toJSON', {
    transform: function (doc, ret) {
        delete ret.__v;
        return ret;
    }
})

const UserModel = mongoose.model(collection, schemaUsers)

export default UserModel