import { Router } from "express";
import { UsuarioController } from "../controllers/usuario.controller";

const router = Router();
const ctlUsuario = new UsuarioController();

//individual
router.get("/listar_individual", ctlUsuario.listarIndividual);
router.post("/registrar_individual", ctlUsuario.registrarIndividual);
router.put("/actualizar_individual", ctlUsuario.actualizarIndividual);
router.post("/login", ctlUsuario.login);
router.put("/actualizar_individual_foto", ctlUsuario.actualizarIndividualFoto);
router.put(
   "/actualizar_individual_contrasenia",
   ctlUsuario.actualizarIndividualContrasenia
);

//grupal
router.get("/listar_grupal", ctlUsuario.listarGrupal);

export { router as usuarioRoutes };
