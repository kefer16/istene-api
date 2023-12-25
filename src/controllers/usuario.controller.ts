import { Request, Response } from "express";
import {
   ActualizaFotoUsuario,
   UsuarioListarIndividualResponse,
   UsuarioLoginResponse,
   UsuarioPasswordLogin,
   UsuarioResponse,
} from "../interfaces/usuario.interface";
import { prisma } from "../config/conexion";
import { ejecutarOperacion } from "../utils/funciones.utils";
import { comparar, encriptar } from "../utils/bcrypt";
import { ErrorPersonalizado } from "../entities/errorPersonalizado.entity";

export class UsuarioController {
   async listarGrupal(req: Request, res: Response) {
      type tipo = UsuarioResponse[];

      await ejecutarOperacion<tipo>(req, res, async () => {
         const result: tipo = await prisma.usuario.findMany({
            orderBy: { fecha_registro: "desc" },
         });

         return result;
      });
   }

   async listarIndividual(req: Request, res: Response) {
      type tipo = UsuarioListarIndividualResponse | null;

      await ejecutarOperacion<tipo>(req, res, async () => {
         const ID: string = String(req.query.usuario_id);

         const result: tipo | null = await prisma.usuario.findUnique({
            select: {
               usuario_id: true,
               dni: true,
               nombre: true,
               apellido_paterno: true,
               apellido_materno: true,
               correo: true,
               usuario: true,
               direccion: true,
               telefono: true,
               fecha_registro: true,
            },
            where: { usuario_id: ID },
         });
         return result;
      });
   }
   async registrarIndividual(req: Request, res: Response) {
      type tipo = UsuarioResponse;

      await ejecutarOperacion<tipo>(req, res, async () => {
         let {
            dni,
            nombre,
            apellido_paterno,
            apellido_materno,
            correo,
            usuario,
            contrasenia,
            foto,
            fecha_registro,
            fk_privilegio,
            direccion,
            activo,
            telefono,
         } = req.body;

         const NroUsuariosConMismoDni = await prisma.usuario.count({
            where: {
               dni: dni,
            },
         });

         if (NroUsuariosConMismoDni > 0) {
            throw new ErrorPersonalizado(
               "Ya existe un usuario con el mismo DNI"
            );
         }

         const NroUsuariosConUsuario = await prisma.usuario.count({
            where: {
               usuario: usuario,
            },
         });

         if (NroUsuariosConUsuario > 0) {
            throw new ErrorPersonalizado(
               "Ya existe un usuario con el mismo nombre de usuario"
            );
         }

         const NroUsuariosConMismoCorreo = await prisma.usuario.count({
            where: {
               correo: correo,
            },
         });

         if (NroUsuariosConMismoCorreo > 0) {
            throw new ErrorPersonalizado(
               "Ya existe un usuario con el mismo correo"
            );
         }

         contrasenia = await encriptar(contrasenia);

         const result: tipo = await prisma.usuario.create({
            data: {
               dni,
               nombre,
               apellido_paterno,
               apellido_materno,
               correo,
               usuario,
               contrasenia,
               foto,
               fecha_registro,
               activo,
               fk_privilegio,
               direccion,
               telefono,
            },
         });

         return result;
      });
   }

   async actualizarIndividual(req: Request, res: Response) {
      type tipo = UsuarioResponse;

      await ejecutarOperacion<tipo>(req, res, async () => {
         const id: string = String(req.query.usuario_id);

         const { correo, direccion, telefono } = req.body;

         const NroUsuariosConMismoCorreo = await prisma.usuario.count({
            where: {
               correo: correo,
               NOT: {
                  usuario_id: id,
               },
            },
         });

         if (NroUsuariosConMismoCorreo > 0) {
            throw new ErrorPersonalizado(
               "Ya existe un usuario con el mismo correo"
            );
         }

         const NroUsuariosConMismoTelefono = await prisma.usuario.count({
            where: {
               telefono: telefono,
               NOT: {
                  usuario_id: id,
               },
            },
         });

         if (NroUsuariosConMismoTelefono > 0) {
            throw new ErrorPersonalizado(
               "Ya existe un usuario con el mismo teléfono"
            );
         }

         const result: tipo = await prisma.usuario.update({
            data: {
               correo,
               direccion,
               telefono,
            },
            where: { usuario_id: id },
         });

         return result;
      });
   }

   async login(req: Request, res: Response) {
      type tipo = UsuarioLoginResponse | null;

      await ejecutarOperacion<tipo>(req, res, async () => {
         const { usuario, contrasenia } = req.body;

         const contrasenia_encriptada: UsuarioPasswordLogin | null =
            await prisma.usuario.findUnique({
               select: {
                  contrasenia: true,
               },
               where: {
                  usuario: usuario,
               },
            });

         if (!contrasenia_encriptada?.contrasenia) {
            throw new ErrorPersonalizado("Usuario o contraseña incorrecta");
         }

         if (
            !(await comparar(contrasenia, contrasenia_encriptada.contrasenia))
         ) {
            throw new ErrorPersonalizado("Usuario o contraseña incorrecta");
         }

         const result: tipo = await prisma.usuario.findUnique({
            select: {
               usuario_id: true,
               dni: true,
               nombre: true,
               apellido_paterno: true,
               apellido_materno: true,
               correo: true,
               usuario: true,
               foto: true,
               activo: true,
               fk_privilegio: true,
               direccion: true,
               telefono: true,
               cls_privilegio: {
                  select: {
                     privilegio_id: true,
                     abreviatura: true,
                     nombre: true,
                  },
               },
            },
            where: {
               usuario: usuario,
               contrasenia: contrasenia_encriptada.contrasenia,
            },
         });

         return result;
      });
   }

   async actualizarIndividualContrasenia(req: Request, res: Response) {
      type tipo = number;

      await ejecutarOperacion<tipo>(req, res, async () => {
         const ID: string = String(req.query.usuario_id);
         let { contrasenia_actual, contrasenia_nueva } = req.body;

         const contrasenia_actual_encriptada: UsuarioPasswordLogin | null =
            await prisma.usuario.findUnique({
               select: {
                  contrasenia: true,
               },
               where: {
                  usuario_id: ID,
                  activo: true,
               },
            });

         if (!contrasenia_actual_encriptada?.contrasenia) {
            throw new ErrorPersonalizado("No se encontró usuario");
         }

         if (
            !(await comparar(
               contrasenia_actual,
               contrasenia_actual_encriptada.contrasenia
            ))
         ) {
            throw new ErrorPersonalizado("La contraseña actual es incorrecta");
         }

         contrasenia_nueva = await encriptar(contrasenia_nueva);

         await prisma.usuario.update({
            data: {
               contrasenia: contrasenia_nueva,
            },
            where: {
               usuario_id: ID,
               activo: true,
            },
         });

         return 1;
      });
   }

   async actualizarIndividualFoto(req: Request, res: Response) {
      type tipo = ActualizaFotoUsuario;

      await ejecutarOperacion<tipo>(req, res, async () => {
         const ID: string = String(req.query.usuario_id);
         const { foto } = req.body;

         const result: tipo = await prisma.usuario.update({
            select: {
               foto: true,
            },
            data: {
               foto: foto,
            },
            where: {
               usuario_id: ID,
            },
         });
         return result;
      });
   }
}
