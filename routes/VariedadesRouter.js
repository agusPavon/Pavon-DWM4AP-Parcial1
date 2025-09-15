// const express = require ('expresss');
import express from 'express';
import {newVariedad, listVariedad, getVariedadByID, deleteVariedadByID, updateVariedadByID} from '../controllers/VariedadesController.js'

// const { listVariedad } = require('../controllers/UsuarioController.js');
const router = express.Router();

router.get('/', listVariedad);
router.get('/:id', getVariedadByID);
router.post('/', newVariedad);
router.put('/:id', updateVariedadByID);
router.delete('/:id', deleteVariedadByID);



export default router;

// module.exports = router;
