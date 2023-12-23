import { Router } from "express";
import { PrivilegioController } from "../controllers/privilegio.controller";
const router = Router();

const ctlPrivilegio = new PrivilegioController();

//individual
router.get("/listar_individual", ctlPrivilegio.listarIndividual);
router.post("/registrar_individual", ctlPrivilegio.registrarIndividual);
router.put("/actualizar_individual", ctlPrivilegio.actualizarInidvidual);
router.delete("/eliminar_individual", ctlPrivilegio.eliminarIndividual);

//grupal
router.get("/listar_grupal", ctlPrivilegio.listarGrupal);

export { router as privilegioRoutes };
