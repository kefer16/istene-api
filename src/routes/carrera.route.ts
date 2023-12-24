import { Router } from "express";
import { CarreraController } from "../controllers/carrera.controller";

const router = Router();
const ctlCarrera = new CarreraController();

//individual

router.get(
   "/listar_individual_nro_activos",
   ctlCarrera.listarIndividualNroActivos
);
router.get("/listar_individual", ctlCarrera.listarIndividual);
router.post("/registrar_individual", ctlCarrera.registrarIndividual);
router.put("/actualizar_individual", ctlCarrera.actualizarIndividual);
router.delete("/eliminar_individual", ctlCarrera.eliminarIndividual);
//grupal
router.get("/listar_grupal_nombre", ctlCarrera.listarGrupalNombre);
router.get("/listar_grupal_activos", ctlCarrera.listarGrupalActivos);

export { router as carreraRoutes };
