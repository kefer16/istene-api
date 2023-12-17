import { Request, Response } from "express";
import { prisma } from "../config/conexion";
import { OperadorReponse } from "../interfaces/responses/operador.response";
import { ejecutarOperacion } from "../utils/funciones.utils";

export class OperadorController {
   async listarGrupal(req: Request, res: Response) {
      type tipo = OperadorReponse[];

      await ejecutarOperacion<tipo>(req, res, async () => {
         const result: tipo = await prisma.operador.findMany({
            orderBy: {
               fecha_registro: "desc",
            },
         });
         return result;
      });
   }

   async listarGrupalActivos(req: Request, res: Response) {
      type tipo = OperadorReponse[];

      await ejecutarOperacion<tipo>(req, res, async () => {
         const result: tipo = await prisma.operador.findMany({
            where: {
               activo: true,
            },
            orderBy: {
               fecha_registro: "desc",
            },
         });
         return result;
      });
   }
}
