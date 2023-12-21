import { Router } from "express";
import { CandidatoEstadoController } from "../controllers/candidato_estado.controller";

const router = Router();
const ctlCandidatoEstado = new CandidatoEstadoController();

//individual

//grupal
router.get("/listar_grupal", ctlCandidatoEstado.listarGrupal);
router.get("/listar_grupal_activos", ctlCandidatoEstado.listarGrupalActivos);

export { router as cadidatoEstadoRoutes };
