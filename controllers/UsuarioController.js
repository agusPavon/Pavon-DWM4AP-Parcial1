// const User  =require('../models/UsuarioModel.js');
import User from '../models/UsuarioModel.js';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import jsonwebtoken from 'jsonwebtoken';

dotenv.config();
const SECRET_KEY  = process.env.SECRET_KEY;

const newUser= async(request, response )=> {
    const {nombre, email, password, foto } = request.body;
    
    if (!nombre || !email || !password){
           response.status(404).json({msg: 'Completa todos los campos!(nombre, email,password, foto )'})

    }


    const user = await User.findOne({email: email});
    if (user){
        response.status(404).json({msg: 'el email ya esta registrado'});
        return;

    }
    console.log(user)
    try{
        const password_hash= await bcrypt.hash(password, 5);
        const nuevoUsuario = new User({nombre, email, password: password_hash, foto });
        const data = await nuevoUsuario.save();
        response.status(201).json({msg: 'listop', data})
    }catch(error){
           response.status(500).json({msg: 'no se pudo guardar el usuario'});
           console.error(error);

    }
    
}


const listUser = async (request , response) => {
    const usuarios= await User.find();
    response.json(usuarios);
}

const getUserByID = async (request, response)=>{
    const id= request.params.id;
    const user = await User.findById(id)
    if (user){
    response.status(200).json({data: user})

    }else{
                    response.status(404).json({msg: 'usuario no encontrado'})

    }
    
}

const deleteUserByID = async (request , response) => {
    const id = request.params.id;
    const user = await User.findByIdAndDelete(id);
    if (user){
    response.status(200).json({msg : 'Usuario eliminado'})

    }else{
                    response.status(404).json({msg: 'usuario no encontrado'})

    }
    
}


const updateUserByID = async (request, response)=>{
    const id = request.params.id;
    const body = request.body;
    const user = await User.findByIdAndUpdate(id);
    if(user){
        response.status(200).json({msg : 'Usuario actualizado'});
    }else{
        response.status(404).json({msg : 'Usuario no encontrado'});
    }
}


const auth = async (request, response)=> {
    const {email, password} = request.body;
    const usuario = await User.findOne({email: email});
    if(!usuario){
        response.status(404).json({msg: 'usuario inválido'});
    }
    const esValido = await bcrypt.compare(password, usuario.password);//respuesta booleana
    if(!esValido){
        response.status(404).json({msg: 'contraseña inválida'})
    }

    const data = {
    id: usuario._id,
    nombre: usuario.nombre,
    email: usuario.email,
    rol: usuario.rol
};


const jwt = jsonwebtoken.sign(data, SECRET_KEY, { expiresIn: '1h' });



    response.status(200).json({msg: 'ok', jwt: jwt});

}


export {newUser, listUser , getUserByID, deleteUserByID, updateUserByID, auth};