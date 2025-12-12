// const express = require ('expresss');
import express from 'express';
import {newUser, listUser, getUserByID, deleteUserByID, updateUserByID, auth} from '../controllers/UsuarioController.js'
import isAdmin from '../middlewares/isAdmin.js';
// const { listUser } = require('../controllers/UsuarioController.js');
import { validarToken } from '../middlewares/auth.js';  
const router = express.Router();

router.post('/auth', auth); 
router.get('/', validarToken, isAdmin, listUser);
router.get('/:id', getUserByID);
router.post('/', newUser);
router.put('/:id', updateUserByID);
router.delete('/:id', validarToken, isAdmin, deleteUserByID);




export default router;

// module.exports = router;
