// const moongose= require('moongose');
import mongoose from 'mongoose'

const Schema = mongoose.Schema;
const esquema = new Schema({
    Nombre : String,
    email : String ,
    password: String, 
    foto: String
});

const User = mongoose.model('User', esquema);

// module.exports= User;

export default User;