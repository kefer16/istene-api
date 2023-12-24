import { Request, Response } from "express";
import { prisma } from "../config/conexion";

import { ejecutarOperacion } from "../utils/funciones.utils";
import { PostulanteEstadoResponse } from "../interfaces/responses/postulante_estado.response";

export class PostulanteEstadoController {
   async listarGrupal(req: Request, res: Response) {
      type tipo = PostulanteEstadoResponse[];

      await ejecutarOperacion<tipo>(req, res, async () => {
         const result: tipo = await prisma.postulante_estado.findMany({
            orderBy: {
               fecha_registro: "desc",
            },
         });
         return result;
      });
   }

   async listarGrupalActivos(req: Request, res: Response) {
      type tipo = PostulanteEstadoResponse[];

      await ejecutarOperacion<tipo>(req, res, async () => {
         const result: tipo = await prisma.postulante_estado.findMany({
            where: {
               activo: true,
            },
            orderBy: {
               nombre: "asc",
            },
         });
         return result;
      });
   }
}
