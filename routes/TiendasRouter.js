import express from "express";
import { validarToken } from "../middlewares/auth.js";
import isAdmin from "../middlewares/isAdmin.js";
import { listTienda, newTienda, updateTiendaByID, deleteTiendaByID } from "../controllers/TiendaController.js";

const router = express.Router();

router.get("/", validarToken, listTienda);

// Solo admin puede modificar
router.post("/", validarToken, isAdmin, newTienda);
router.put("/:id", validarToken, isAdmin, updateTiendaByID);
router.delete("/:id", validarToken, isAdmin, deleteTiendaByID);

export default router;
