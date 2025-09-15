// const moongose= require('moongose');
import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const esquema = new Schema({
    nombre : String,
    preparación : String ,
    foto: String
});

const Variedad = mongoose.model('Variedad', esquema);

// module.exports= User;

export default Variedad;