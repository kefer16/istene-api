import { Router } from "express";
import { PrivilegioController } from "../controllers/privilegio.controller";

const router = Router();

router.get("/listar_todos", PrivilegioController.listarTodos);
router.get("/listar_uno", PrivilegioController.listarUno);
router.post("/registrar_uno", PrivilegioController.registrar);
router.put("/actualizar_uno", PrivilegioController.actualizar);
router.delete("/eliminar_uno", PrivilegioController.eliminarUno);

export { router as privilegioRoutes };
