import Tienda from "../models/TiendasModel.js";

const listTienda = async (req, res) => {
  try {

    const tiendas = await Tienda
      .find()
      .populate('user', 'nombre email rol'); // campos que se devuelven del usuario

    res.status(200).json({ msg: "Ok", data: tiendas });

  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error al obtener las tiendas", data: [] });
  }
};


const newTienda = async (req, res) => {
    const { nombre, direccion, descripcion, foto } = req.body;
      
    if (!nombre || !direccion || !descripcion){
           res.status(404).json({msg: 'Completa todos los campos!(nombre, dirección ,descripción, foto )'})

    }
const user = req.user.id; 
 

    const tienda = new Tienda({
        nombre,
        direccion,
        descripcion,
        foto,
        user
    });

    const data = await tienda.save();
    res.status(201).json({ msg: "Tienda creada", data });
};

const updateTiendaByID = async (req, res) => {
    const tienda = await Tienda.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json({ msg: "Tienda actualizada", data: tienda });
};

const deleteTiendaByID =  async (req, res) => {
  try {
    const id = req.params.id;
    const tienda = await Tienda.findById(id);

    if (!tienda) {
      return res.status(404).json({ msg: "tienda no encontrada" });
    }

    // SOLO EL ADMIN
    if ( req.user.rol !== "admin") {
      return res.status(403).json({ msg: "No tienes permiso para eliminar esta tienda" });
    }

    await tienda.deleteOne();
    res.status(200).json({ msg: "tienda eliminada" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error al borrar tienda" });
  }
};


const getTiendaByID = async (request, response)=>{
    const id= request.params.id;
    const tienda = await Tienda.findById(id)
    if (tienda){
    response.status(200).json({data: tienda})

    }else{
                    response.status(404).json({msg: 'tienda no encontrada'})

    }
    
}

export { listTienda, newTienda, updateTiendaByID, deleteTiendaByID, getTiendaByID };



