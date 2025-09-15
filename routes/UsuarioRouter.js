// const express = require ('expresss');
import express from 'express';
import {newUser, listUser, getUserByID, deleteUserByID, updateUserByID} from '../controllers/UsuarioController.js'

// const { listUser } = require('../controllers/UsuarioController.js');
const router = express.Router();

router.get('/', listUser);
router.get('/:id', getUserByID);
router.post('/', newUser);
router.put('/:id', updateUserByID);
router.delete('/:id', deleteUserByID);



export default router;

// module.exports = router;
