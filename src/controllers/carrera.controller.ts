import { Request, Response } from "express";
import { CarreraResponse } from "../interfaces/responses/carrera.response";
import { ejecutarOperacion } from "../utils/funciones.utils";
import { prisma } from "../config/conexion";
import { ErrorPersonalizado } from "../entities/errorPersonalizado.entity";

export class CarreraController {
   async listarIndividual(req: Request, res: Response) {
      type tipo = CarreraResponse | null;

      await ejecutarOperacion<tipo>(req, res, async () => {
         const id: string = String(req.query.carrera_id);

         const result: tipo = await prisma.carrera.findUnique({
            where: {
               carrera_id: id,
            },
         });
         return result;
      });
   }

   async eliminarIndividual(req: Request, res: Response) {
      type tipo = CarreraResponse | null;

      await ejecutarOperacion<tipo>(req, res, async () => {
         const id: string = String(req.query.carrera_id);

         const result: tipo = await prisma.carrera.delete({
            where: {
               carrera_id: id,
            },
         });
         return result;
      });
   }

   async registrarIndividual(req: Request, res: Response) {
      type tipo = CarreraResponse;

      await ejecutarOperacion<tipo>(req, res, async () => {
         const { nombre, activo, fecha_registro, fk_usuario } = req.body;

         const NroCarrerasConMismoNombre = await prisma.carrera.count({
            where: {
               nombre: nombre,
            },
         });

         if (NroCarrerasConMismoNombre > 0) {
            throw new ErrorPersonalizado(
               "Ya existe una carrera con el mismo nombre"
            );
         }

         const result: tipo = await prisma.carrera.create({
            data: {
               nombre,
               activo,
               fecha_registro,
               fk_usuario,
            },
         });
         return result;
      });
   }

   async actualizarIndividual(req: Request, res: Response) {
      type tipo = CarreraResponse;

      await ejecutarOperacion<tipo>(req, res, async () => {
         const id: string = String(req.query.carrera_id);

         const { nombre, activo, fecha_registro, fk_usuario } = req.body;

         const NroCarrerasConMismoNombre = await prisma.carrera.count({
            where: {
               nombre: nombre,
               NOT: {
                  carrera_id: id,
               },
            },
         });

         if (NroCarrerasConMismoNombre > 0) {
            throw new ErrorPersonalizado(
               "Ya existe una carrera con el mismo nombre"
            );
         }

         const result: tipo = await prisma.carrera.update({
            data: {
               nombre,
               activo,
               fecha_registro,
               fk_usuario,
            },
            where: {
               carrera_id: id,
            },
         });
         return result;
      });
   }

   async listarGrupalNombre(req: Request, res: Response) {
      type tipo = CarreraResponse[];

      await ejecutarOperacion<tipo>(req, res, async () => {
         const nombre: string = String(req.query.nombre);

         const result: tipo = await prisma.carrera.findMany({
            where: {
               nombre: {
                  contains: nombre,
               },
            },

            orderBy: {
               fecha_registro: "desc",
            },
         });
         return result;
      });
   }

   async listarGrupalActivos(req: Request, res: Response) {
      type tipo = CarreraResponse[];

      await ejecutarOperacion<tipo>(req, res, async () => {
         const result: tipo = await prisma.carrera.findMany({
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
