// const User  =require('../models/UsuarioModel.js');
import User from '../models/UsuarioModel.js';

const newUser= async(request, response )=> {
    const {nombre, email, password, foto } = request.body;
    const nuevoUsuario = new User({nombre, email, password, foto });
     if(nombre && email && password){
         const data = await nuevoUsuario.save();
         response.status(201).json({msg: 'listop', data})
    }else if (!nombre || !email || !password){
           response.status(404).json({msg: 'Completa todos los campos!(nombre, email,password, foto )'})

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

export {newUser, listUser , getUserByID, deleteUserByID, updateUserByID};