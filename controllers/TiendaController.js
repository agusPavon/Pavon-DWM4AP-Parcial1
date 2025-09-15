import Tienda from '../models/TiendasModel.js';

const newTienda= async(request, response )=> {
    const {nombre, direccion, calificacion, foto } = request.body;
    const nuevaTienda = new Tienda({nombre, direccion, calificacion, foto });
    const data = await nuevaTienda.save();
response.status(201).json({msg: 'listop', data})
}

const listTienda = async (request , response) => {
    const tiendas= await Tienda.find();
    response.json(tiendas);
}

const getTiendaByID = async (request, response)=>{
    const id= request.params.id;
    const tienda = await Tienda.findById(id)
    if (tienda){
    response.status(200).json({data: tienda})

    }else{
                    response.status(404).json({msg: 'tienda no encontrada'})

    }
    
}

const deleteTiendaByID = async (request , response) => {
    const id = request.params.id;
    const tienda = await Tienda.findByIdAndDelete(id);
    if (tienda){
    response.status(200).json({msg : 'Tienda eliminada'})

    }else{
                    response.status(404).json({msg: 'Tienda no encontrada'})

    }
    
}


const updateTiendaByID = async (request, response)=>{
    const id = request.params.id;
    const body = request.body;
    const tienda = await Tienda.findByIdAndUpdate(id);
    if(tienda){
        response.status(200).json({msg : 'Tienda actualizada'});
    }else{
        response.status(404).json({msg : 'Tienda no encontrada'});
    }
}

export {newTienda, listTienda , getTiendaByID, deleteTiendaByID, updateTiendaByID};