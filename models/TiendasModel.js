// const moongose= require('moongose');
import mongoose from 'mongoose'

const Schema = mongoose.Schema;
const esquema = new Schema({
    nombre : String,
    direccion : String ,
    calificacion: String, 
    foto: String
});

const Tienda = mongoose.model('Tienda', esquema);

// module.exports= User;

export default Tienda;