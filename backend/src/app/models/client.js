const mongoose = require ('../../database');
const bcrypt = require('bcryptjs');

const ClientSchema = new mongoose.Schema({
    
    name:{
        type: String,
        require: true,
    },
    cpf :{
        type:Number,
        unique: true,
        require: true,
    },
    phone: {
        type:Number,
        require: true,
    },
    email: {
        type: String,
        require: true,
    },
    address: {
        type: String,
        require: true,
    },
    number: {
        type:Number,
        require: true,
    },
    complement: {
        type:String,
        require: false,
    },
    city: {
        type: String,
        require: true,  
    },
    state: {
        type: String,
        require: true,
    },
    cep: {
        type: Number,
        require: true,
    },
    user : {
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
        require: true,
    },    
    createdAt:{
        type: Date,
        default: Date.now,
    },
});


const Client = mongoose.model ('Client', ClientSchema);

module.exports = Client;