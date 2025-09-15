// const express = require ('expresss');
import express from 'express';
import {newTienda, listTienda, getTiendaByID, deleteTiendaByID, updateTiendaByID} from '../controllers/TiendaController.js'

// const { listTienda } = require('../controllers/UsuarioController.js');
const router = express.Router();

router.get('/', listTienda);
router.get('/:id', getTiendaByID);
router.post('/', newTienda);
router.put('/:id', updateTiendaByID);
router.delete('/:id', deleteTiendaByID);



export default router;

// module.exports = router;
