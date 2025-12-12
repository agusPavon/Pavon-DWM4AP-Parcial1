// const moongose= require('moongose');
import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const esquema = new Schema({
    nombre : {
        type: String,
        required: true
        },
    preparacion : {
        type: String,
        required: true
        },
    foto: {
        type: String,
        },

    user :{
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
});

const Variedad = mongoose.model('Variedad', esquema);

// module.exports= User;

export default Variedad;