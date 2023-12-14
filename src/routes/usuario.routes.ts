import { Router } from "express";
import { UsuarioController } from "../controllers/usuario.controller";

const router = Router();

router.get("/todos", UsuarioController.listarTodos);
router.get("/uno", UsuarioController.listarUno);
router.post("/registrar", UsuarioController.registrar);
router.put("/actualizar", UsuarioController.actualizar);
router.post("/login", UsuarioController.login);
router.get("/historial", UsuarioController.historial);
router.delete("/eliminar", UsuarioController.eliminarUno);
router.put("/actualizar_nombre", UsuarioController.actualizarNombre);
router.put("/actualizar_apellido", UsuarioController.actualizarApellido);
router.put("/actualizar_correo", UsuarioController.actualizarCorreo);
router.put("/actualizar_direccion", UsuarioController.actualizarDireccion);
router.put("/actualizar_foto", UsuarioController.actualizarFoto);
router.put("/actualizar_contrasenia", UsuarioController.actualizarContrasenia);

export { router as usuarioRoutes };
