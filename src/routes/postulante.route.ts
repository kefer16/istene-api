import { Router } from "express";
import { PostulanteController } from "../controllers/postulante.controller";

const router = Router();
const ctlPostulante = new PostulanteController();

//individual
router.get(
   "/listar_individual_cantidad_estado",
   ctlPostulante.listarIndividualCantidadPorEstado
);
router.get("/listar_individual", ctlPostulante.listarIndividual);
router.post("/registrar_individual", ctlPostulante.registrarIndividual);
router.put("/actualizar_individual", ctlPostulante.actualizarIndividual);
router.delete("/eliminar_individual", ctlPostulante.eliminarIndividual);
//grupal
router.get("/listar_grupal_dni", ctlPostulante.listarGrupalDNI);
router.get("/listar_grupal_activos", ctlPostulante.listarGrupalActivos);
router.get(
   "/listar_grupal_reportes_filtro",
   ctlPostulante.listarGrupalReportesFiltro
);

export { router as PostulanteRoutes };
