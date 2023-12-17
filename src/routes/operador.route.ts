import { Router } from "express";
import { OperadorController } from "../controllers/operador.controller";

const router = Router();
const ctlOperador = new OperadorController();

//individual

//grupal
router.get("/listar_grupal", ctlOperador.listarGrupal);
router.get("/listar_grupal_activos", ctlOperador.listarGrupalActivos);

export { router as operadorRoutes };
