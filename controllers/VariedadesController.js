import Variedad from '../models/VariedadesModel.js';


const newVariedad = async (req, res) => {
  try {
    const { nombre, preparacion, foto } = req.body;

    if (!nombre || !preparacion) {
      return res.status(400).json({ msg: "Completa nombre y preparación" });
    }

    const user = req.user.id; // ← tomado del token

    const nueva = new Variedad({
      nombre,
      preparacion,
      foto: foto || null,
      user
    });

    const data = await nueva.save();

    res.status(201).json({ msg: "Variedad creada", data });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error al crear la variedad" });
  }
};

const listVariedad = async (req, res) => {
  try {
    const { id, rol } = req.user;  // viene del token decodificado

    // Si es admin ve todas, si es cliente solo las suyas
    const filter = rol === 'admin' ? {} : { user: id };

    const variedades = await Variedad
      .find(filter)
      .populate('user', 'nombre email'); // campos que se devuelven del usuario

    res.status(200).json({ msg: "Ok", data: variedades });

  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error al obtener las variedades", data: [] });
  }
};


const getVariedadByID = async (request, response)=>{
    const id= request.params.id;//requerimos el id como parametro en la url para ver el id que instanciamos actualmente
    const variedad = await Variedad.findById(id)
    if (variedad){
    response.status(200).json({data: variedad})

    }else{
                    response.status(404).json({msg: 'Variedad no encontrada'})

    }
    
}

const deleteVariedadByID = async (req, res) => {
  try {
    const id = req.params.id;
    const variedad = await Variedad.findById(id);

    if (!variedad) {
      return res.status(404).json({ msg: "Variedad no encontrada" });
    }

    // SOLO EL MISMO USUARIO O EL ADMIN
    if (variedad.user.toString() !== req.user.id && req.user.rol !== "admin") {
      return res.status(403).json({ msg: "No tienes permiso para eliminar esta variedad" });
    }

    await variedad.deleteOne();
    res.status(200).json({ msg: "Variedad eliminada" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error al borrar variedad" });
  }
};


const updateVariedadByID = async (req, res) => {
  try {
    const id = req.params.id;

    const variedad = await Variedad.findById(id);

    if (!variedad) {
      return res.status(404).json({ msg: "Variedad no encontrada" });
    }

    if (variedad.user.toString() !== req.user.id && req.user.rol !== "admin") {
      return res.status(403).json({ msg: "No tienes permiso para editar esta variedad" });
    }

    const updated = await Variedad.findByIdAndUpdate(id, req.body, { new: true });

    res.status(200).json({ msg: "Variedad actualizada", data: updated });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error en servidor" });
  }
};




const getVariedad = async (req, res) => {
    try{
        const variedad = await Variedad.find().populate('user');
        res.status(200).json({msg: 'sw', data: variedad })

    }catch (error){
        console.error(error);
        res.status(500).json({msg: "error al crear la variedad", data: {}})
    }
}

const putVariedad = async(req, res)=>{
    try{

    }catch (error){
        console.error(error);
        res.status(500).json({msg: "error al crear la variedad", data: {}})
    }
}

const postVariedad = async(req, res)=>{
    try{
        const {preparacion} = req.body;
        if(!preparacion){
            return res.status(401).json({msg: 'falta la preparacion'})
        }
        const user= {_id : req.user._id};
        const variedad = new Variedad({preparacion, user});
        await variedad.save();
        res.status(202).json({msg: 'tarea creada', data: variedad});
    }catch (error){
        console.error(error);
        res.status(500).json({msg: "error al crear la variedad", data: {}})
    }
}





export {newVariedad, listVariedad , getVariedadByID, deleteVariedadByID, updateVariedadByID, postVariedad, getVariedad};