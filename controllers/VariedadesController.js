import Variedad from '../models/VariedadesModel.js';

const newVariedad= async(request, response )=> {
    const {nombre, preparación, foto } = request.body;
    const nuevaVariedad = new Variedad({nombre, preparación, foto });
    if(nombre && preparación ){
         const data = await nuevaVariedad.save();
         response.status(201).json({msg: 'listop', data})
    }else if (!nombre || !preparación){
           response.status(404).json({msg: 'Completa todos los campos!(nombre y preparación)'})

    }
   

}

const listVariedad = async (request , response) => {
    const variedades = await Variedad.find();
    response.json(variedades);
}

const getVariedadByID = async (request, response)=>{
    const id= request.params.id;//requerimos el id como parametro en la url para ver el id que instanciamos actualmente
    const variedad = await Variedad.findById(id)
    if (variedad){
    response.status(200).json({data: variedad})

    }else{
                    response.status(404).json({msg: 'Variedad no encontrada'})

    }
    
}

const deleteVariedadByID = async (request , response) => {
    const id = request.params.id;
    const variedad = await Variedad.findByIdAndDelete(id);
    if (variedad){
    response.status(200).json({msg : 'Variedad eliminada'})

    }else{
                    response.status(404).json({msg: 'Variedad no encontrada'})

    }
    
}


const updateVariedadByID = async (request, response)=>{
    const id = request.params.id;
    const body = request.body;
    const variedad = await Variedad.findByIdAndUpdate(id);
    if(variedad){
        response.status(200).json({msg : 'Variedad actualizada'});
    }else{
        response.status(404).json({msg : 'Variedad no encontrada'});
    }
}

export {newVariedad, listVariedad , getVariedadByID, deleteVariedadByID, updateVariedadByID};