import mongoose from "mongoose";

const Schema = mongoose.Schema;

const esquema = new Schema({
    nombre: { type: String, required: true },
    direccion: { type: String, required: true },
    descripcion: { type: String },
    foto: { type: String },
    user: { 
        type: Schema.Types.ObjectId, 
        ref: "User", 
        required: true } // admin que la creó
});

const Tienda = mongoose.model("Tienda", esquema);
export default Tienda;
