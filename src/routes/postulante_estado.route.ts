import { Router } from "express";
import { PostulanteEstadoController } from "../controllers/postulante_estado.controller";

const router = Router();
const ctlPostulanteEstado = new PostulanteEstadoController();

//individual

//grupal
router.get("/listar_grupal", ctlPostulanteEstado.listarGrupal);
router.get("/listar_grupal_activos", ctlPostulanteEstado.listarGrupalActivos);

export { router as PostulanteEstadoRoutes };
