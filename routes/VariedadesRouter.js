// const express = require ('expresss');
import express from 'express';
import isAdmin from '../middlewares/isAdmin.js';
import {newVariedad, listVariedad, getVariedadByID, deleteVariedadByID, updateVariedadByID, postVariedad} from '../controllers/VariedadesController.js'
import { validarToken } from '../middlewares/auth.js'; //empezamos a proteger las rutas, tengo q hacerlo en el front y en el back
// // const { listVariedad } = require('../controllers/UsuarioController.js');
const router = express.Router();

router.use(validarToken); // protege todo

router.get('/', listVariedad);
router.get('/:id', getVariedadByID);
router.post('/', newVariedad);
router.put('/:id', updateVariedadByID);
router.delete('/:id', deleteVariedadByID);



export default router;

// module.exports = router;
