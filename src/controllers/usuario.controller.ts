import { Request, Response } from "express";
import {
   ActualizaApellidoUsuario,
   ActualizaCorreoUsuario,
   ActualizaDireccionUsuario,
   ActualizaFotoUsuario,
   ActualizaNombreUsuario,
   UsuarioHistorialSend,
   UsuarioLoginSend,
   UsuarioPasswordLogin,
   UsuarioSend,
} from "../interfaces/usuario.interface";
import { prisma } from "../config/conexion";
import { ejecutarOperacion } from "../utils/funciones.utils";
import { comparar, encriptar } from "../utils/bcrypt";
import { ErrorPersonalizado } from "../entities/errorPersonalizado.entity";

export class UsuarioController {
   static async listarTodos(req: Request, res: Response) {
      type tipo = UsuarioSend[];

      await ejecutarOperacion<tipo>(req, res, async () => {
         const result: tipo = await prisma.usuario.findMany({
            orderBy: { fecha_registro: "desc" },
         });

         return result;
      });
   }

   static async listarUno(req: Request, res: Response) {
      type tipo = UsuarioSend | null;

      await ejecutarOperacion<tipo>(req, res, async () => {
         const ID: number = Number(req.query.usuario_id);

         const result: UsuarioSend | null = await prisma.usuario.findUnique({
            include: {
               cls_privilegio: {
                  select: {
                     privilegio_id: true,
                     tipo: true,
                  },
               },
            },
            where: { usuario_id: ID },
         });
         return result;
      });
   }
   static async registrar(req: Request, res: Response) {
      type tipo = UsuarioSend;

      await ejecutarOperacion<tipo>(req, res, async () => {
         let {
            nombre,
            apellido,
            correo,
            usuario,
            contrasenia,
            foto,
            fecha_registro,
            fk_privilegio,
            direccion,
            telefono,
         } = req.body;

         contrasenia = await encriptar(contrasenia);

         const result: tipo = await prisma.usuario.create({
            data: {
               nombre: nombre,
               apellido: apellido,
               correo: correo,
               usuario: usuario,
               contrasenia: contrasenia,
               foto: foto,
               fecha_registro: fecha_registro,
               activo: true,
               fk_privilegio: fk_privilegio,
               direccion: direccion,
               telefono: telefono,
            },
         });

         return result;
      });
   }

   static async actualizar(req: Request, res: Response) {
      type tipo = UsuarioSend;

      await ejecutarOperacion<tipo>(req, res, async () => {
         const ID: number = Number(req.query.usuario_id);

         const {
            nombre,
            apellido,
            correo,
            usuario,
            contrasenia,
            foto,
            activo,
            fk_privilegio,
            direccion,
            telefono,
         } = req.body;

         const result: tipo = await prisma.usuario.update({
            data: {
               nombre: nombre,
               apellido: apellido,
               correo: correo,
               usuario: usuario,
               contrasenia: contrasenia,
               foto: foto,
               activo: activo,
               fk_privilegio: fk_privilegio,
               direccion: direccion,
               telefono: telefono,
            },
            where: { usuario_id: ID },
         });

         return result;
      });
   }

   static async login(req: Request, res: Response) {
      type tipo = UsuarioLoginSend | null;

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
               nombre: true,
               apellido: true,
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
                     tipo: true,
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

   static async historial(req: Request, res: Response) {
      type tipo = UsuarioHistorialSend[];

      await ejecutarOperacion<tipo>(req, res, async () => {
         const ID = Number(req.query.usuario_id);

         const result: tipo = await prisma.usuario_historial.findMany({
            where: {
               usuario_id: ID,
            },
            orderBy: {
               fecha_final: "desc",
            },
         });

         return result;
      });
   }

   static async eliminarUno(req: Request, res: Response) {
      type tipo = UsuarioSend;

      await ejecutarOperacion<tipo>(req, res, async () => {
         const ID = Number(req.query.usuario_id);

         const result: tipo = await prisma.usuario.delete({
            where: {
               usuario_id: ID,
            },
         });
         return result;
      });
   }

   static async actualizarNombre(req: Request, res: Response) {
      type tipo = ActualizaNombreUsuario;

      await ejecutarOperacion<tipo>(req, res, async () => {
         const ID = Number(req.query.usuario_id);
         const { nombre } = req.body;

         const result: tipo = await prisma.usuario.update({
            select: {
               nombre: true,
            },
            data: {
               nombre: nombre,
            },
            where: {
               usuario_id: ID,
            },
         });
         return result;
      });
   }
   static async actualizarApellido(req: Request, res: Response) {
      type tipo = ActualizaApellidoUsuario;

      await ejecutarOperacion<tipo>(req, res, async () => {
         const ID = Number(req.query.usuario_id);
         const { apellido } = req.body;

         const result: tipo = await prisma.usuario.update({
            select: {
               apellido: true,
            },
            data: {
               apellido: apellido,
            },
            where: {
               usuario_id: ID,
            },
         });
         return result;
      });
   }
   static async actualizarCorreo(req: Request, res: Response) {
      type tipo = ActualizaCorreoUsuario;

      await ejecutarOperacion<tipo>(req, res, async () => {
         const ID = Number(req.query.usuario_id);
         const { correo } = req.body;

         const result: tipo = await prisma.usuario.update({
            select: {
               correo: true,
            },
            data: {
               correo: correo,
            },
            where: {
               usuario_id: ID,
            },
         });
         return result;
      });
   }
   static async actualizarDireccion(req: Request, res: Response) {
      type tipo = ActualizaDireccionUsuario;

      await ejecutarOperacion<tipo>(req, res, async () => {
         const ID = Number(req.query.usuario_id);
         const { direccion } = req.body;

         const result: tipo = await prisma.usuario.update({
            select: {
               direccion: true,
            },
            data: {
               direccion: direccion,
            },
            where: {
               usuario_id: ID,
            },
         });
         return result;
      });
   }
   static async actualizarContrasenia(req: Request, res: Response) {
      type tipo = number[];

      await ejecutarOperacion<tipo>(req, res, async () => {
         const ID = Number(req.query.usuario_id);
         let { contrasenia_actual, contrasenia_nueva } = req.body;

         contrasenia_actual = await encriptar(contrasenia_actual);
         contrasenia_nueva = await encriptar(contrasenia_nueva);
         console.log(contrasenia_actual, contrasenia_nueva);

         const result = prisma.$executeRaw`exec sp_actualizar_contrasenia @usuario_id = ${ID}, @contrasenia_actual = ${contrasenia_actual}, @contrasenia_nueva = ${contrasenia_nueva} `;
         const result1 = await prisma.$transaction([result]);

         return result1;
      });
   }

   static async actualizarFoto(req: Request, res: Response) {
      type tipo = ActualizaFotoUsuario;

      await ejecutarOperacion<tipo>(req, res, async () => {
         const ID = Number(req.query.usuario_id);
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
