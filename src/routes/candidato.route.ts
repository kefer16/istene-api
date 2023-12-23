import { Router } from "express";
import { CandidatoController } from "../controllers/candidato.controller";

const router = Router();
const ctlCandidato = new CandidatoController();

//individual
router.get(
   "/listar_individual_cantidad_estado",
   ctlCandidato.listarIndividualCantidadPorEstado
);
router.get("/listar_individual", ctlCandidato.listarIndividual);
router.post("/registrar_individual", ctlCandidato.registrarIndividual);
router.put("/actualizar_individual", ctlCandidato.actualizarIndividual);
router.delete("/eliminar_individual", ctlCandidato.eliminarIndividual);
//grupal
router.get("/listar_grupal_dni", ctlCandidato.listarGrupalDNI);
router.get("/listar_grupal_activos", ctlCandidato.listarGrupalActivos);

export { router as candidatoRoutes };
