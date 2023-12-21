import { Request, Response } from "express";
import { prisma } from "../config/conexion";
import { CandidatoEstadoResponse } from "../interfaces/responses/candidato_estado.response";
import { ejecutarOperacion } from "../utils/funciones.utils";

export class CandidatoEstadoController {
   async listarGrupal(req: Request, res: Response) {
      type tipo = CandidatoEstadoResponse[];

      await ejecutarOperacion<tipo>(req, res, async () => {
         const result: tipo = await prisma.candidatoEstado.findMany({
            orderBy: {
               fecha_registro: "desc",
            },
         });
         return result;
      });
   }

   async listarGrupalActivos(req: Request, res: Response) {
      type tipo = CandidatoEstadoResponse[];

      await ejecutarOperacion<tipo>(req, res, async () => {
         const result: tipo = await prisma.candidatoEstado.findMany({
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
