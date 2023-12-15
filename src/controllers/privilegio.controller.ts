import { Request, Response } from "express";
import { prisma } from "../config/conexion";
import { PrivilegioSend } from "../interfaces/privilegio.interface";
import { ejecutarOperacion } from "../utils/funciones.utils";

export class PrivilegioController {
   static async listarTodos(req: Request, res: Response) {
      type tipo = PrivilegioSend[];

      await ejecutarOperacion<tipo>(req, res, async () => {
         const result: tipo = await prisma.privilegio.findMany({
            orderBy: {
               fecha_registro: "desc",
            },
         });
         return result;
      });
   }

   static async listarUno(req: Request, res: Response) {
      type tipo = PrivilegioSend | null;

      await ejecutarOperacion<tipo>(req, res, async () => {
         const idPrivilegio: string = String(req.query.privilegio_id);

         const result: tipo = await prisma.privilegio.findUnique({
            where: {
               privilegio_id: idPrivilegio,
            },
         });
         return result;
      });
   }

   static async registrar(req: Request, res: Response) {
      type tipo = PrivilegioSend;

      await ejecutarOperacion<tipo>(req, res, async () => {
         const { nombre, activo, abreviatura, fecha_registro } = req.body;
         const result: tipo = await prisma.privilegio.create({
            data: {
               nombre,
               activo,
               abreviatura,
               fecha_registro,
            },
         });
         return result;
      });
   }

   static async actualizar(req: Request, res: Response) {
      type tipo = PrivilegioSend;

      await ejecutarOperacion<tipo>(req, res, async () => {
         const idPrivilegio: string = String(req.query.privilegio_id);

         const { nombre, activo, abreviatura, fecha_registro } = req.body;

         const result: tipo = await prisma.privilegio.update({
            data: {
               nombre,
               activo,
               abreviatura,
               fecha_registro,
            },
            where: {
               privilegio_id: idPrivilegio,
            },
         });
         return result;
      });
   }
   static async eliminarUno(req: Request, res: Response) {
      type tipo = PrivilegioSend;

      await ejecutarOperacion<tipo>(req, res, async () => {
         const ID: string = String(req.query.privilegio_id);

         const result: tipo = await prisma.privilegio.delete({
            where: {
               privilegio_id: ID,
            },
         });

         return result;
      });
   }
}
