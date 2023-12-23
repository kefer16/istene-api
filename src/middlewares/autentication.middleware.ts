import { Request, Response } from "express";
import { prisma } from "../config/conexion";

export class AutenticacionControlller {
   async esBearerValido(req: Request, res: Response) {
      const autorizacion = req.headers.authorization;

      if (autorizacion?.split(" ")[0] !== "Bearer") {
         return false;
      }

      const bearer = autorizacion.split(" ")[1];

      const existeBearer = await prisma.autenticacion.count({
         where: {
            bearer: {
               equals: bearer,
            },
            activo: true,
         },
      });

      if (existeBearer <= 0) {
         return false;
      }
      return true;
   }
}
