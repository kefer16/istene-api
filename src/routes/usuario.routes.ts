import { Router } from "express";
import { UsuarioController } from "../controllers/usuario.controller";

const router = Router();

router.get("/listar_todos", UsuarioController.listarTodos);
router.get("/listar_uno", UsuarioController.listarUno);
router.post("/registrar_uno", UsuarioController.registrar);
router.put("/actualizar_uno", UsuarioController.actualizar);
router.post("/login", UsuarioController.login);
router.delete("/eliminar_uno", UsuarioController.eliminarUno);
router.put("/actualizar_nombre", UsuarioController.actualizarNombre);
router.put("/actualizar_apellido", UsuarioController.actualizarApellido);
router.put("/actualizar_correo", UsuarioController.actualizarCorreo);
router.put("/actualizar_direccion", UsuarioController.actualizarDireccion);
router.put("/actualizar_foto", UsuarioController.actualizarFoto);
router.put("/actualizar_contrasenia", UsuarioController.actualizarContrasenia);

export { router as usuarioRoutes };
