// const moongose= require('moongose');
import mongoose from 'mongoose'

const Schema = mongoose.Schema;
const esquema = new Schema({

    nombre: {
        required: true,
       type : String,
       min: [3, 'el nombre debe ser de al menos 3 carácteres'],
       max: [12, 'el nombre debe tener menos de 13 caracteres']
    },    
    email : {
        required: true,
       type : String,
       unique: true
    },   
    password: {
        required: true,
       type : String,
    },
    rol: {
        type: String,
        enum: ['admin', 'cliente'],
        default: 'cliente'
    },
    foto: {
       type : String,
    }
});

const User = mongoose.model('User', esquema);

// module.exports= User;

export default User;