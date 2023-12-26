import { Request, Response } from "express";
import {
   CarreraListarGrupalNombreResponse,
   CarreraListarIndividualResponse,
   CarreraResponse,
} from "../interfaces/responses/carrera.response";
import { ejecutarOperacion } from "../utils/funciones.utils";
import { prisma } from "../config/conexion";
import { ErrorPersonalizado } from "../entities/errorPersonalizado.entity";
import { CarreraHistorialRequest } from "../interfaces/requests/carrera.request";

export class CarreraController {
   async listarIndividualNroActivos(req: Request, res: Response) {
      type tipo = number | null;

      await ejecutarOperacion<tipo>(req, res, async () => {
         const result: tipo = await prisma.carrera.count({
            where: {
               activo: true,
            },
         });
         return result;
      });
   }
   async listarIndividual(req: Request, res: Response) {
      type tipo = CarreraListarIndividualResponse | null;

      await ejecutarOperacion<tipo>(req, res, async () => {
         const id: string = String(req.query.carrera_id);

         const result: tipo = await prisma.carrera.findUnique({
            select: {
               carrera_id: true,
               nombre: true,
               descripcion: true,
               activo: true,
               fecha_registro: true,
               fecha_actualizacion: true,
               fk_usuario: true,
               cls_usuario: {
                  select: {
                     usuario: true,
                  },
               },
               lst_carrera_historial: {
                  select: {
                     cls_usuario: {
                        select: {
                           usuario: true,
                        },
                     },
                  },
                  orderBy: {
                     fecha_registro: "desc",
                  },
               },
            },
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

         const NroPostulantesConMismoCarrera =
            await prisma.postulante_carrera.count({
               where: {
                  fk_carrera: id,
               },
            });
         if (NroPostulantesConMismoCarrera > 0) {
            throw new ErrorPersonalizado(
               `No se puede eliminar la carrera, ya se asignó a ${NroPostulantesConMismoCarrera} postulantes`
            );
         }

         await prisma.carrera_historial.delete({
            where: {
               fk_carrera: id,
            },
         });

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
         const {
            nombre,
            descripcion,
            activo,
            fecha_registro,
            fecha_actualizacion,
            fk_usuario,
         } = req.body;

         const clsCarreraHistorial: CarreraHistorialRequest =
            req.body.cls_carrera_historial;

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
               descripcion,
               activo,
               fecha_registro,
               fecha_actualizacion,
               fk_usuario,
            },
         });

         await prisma.carrera_historial.create({
            data: {
               fecha_registro: clsCarreraHistorial.fecha_registro,
               fk_usuario: clsCarreraHistorial.fk_usuario,
               fk_carrera: result.carrera_id,
            },
         });
         return result;
      });
   }

   async actualizarIndividual(req: Request, res: Response) {
      type tipo = CarreraResponse;

      await ejecutarOperacion<tipo>(req, res, async () => {
         const id: string = String(req.query.carrera_id);

         const { nombre, descripcion, activo, fecha_actualizacion } = req.body;
         const clsCarreraHistorial: CarreraHistorialRequest =
            req.body.cls_carrera_historial;

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
               descripcion,
               activo,
               fecha_actualizacion,
            },
            where: {
               carrera_id: id,
            },
         });

         await prisma.carrera_historial.create({
            data: {
               fecha_registro: clsCarreraHistorial.fecha_registro,
               fk_usuario: clsCarreraHistorial.fk_usuario,
               fk_carrera: id,
            },
         });

         return result;
      });
   }

   async listarGrupalNombre(req: Request, res: Response) {
      type tipo = CarreraListarGrupalNombreResponse[];

      await ejecutarOperacion<tipo>(req, res, async () => {
         const nombre: string = String(req.query.nombre);
         const activo: string = String(req.query.activo);
         const case_where_activo =
            activo === "-1" ? {} : Boolean(Number(activo));

         const result: tipo = await prisma.carrera.findMany({
            select: {
               carrera_id: true,
               nombre: true,
               descripcion: true,
               fecha_registro: true,
               fecha_actualizacion: true,
               activo: true,
               lst_carrera_historial: {
                  select: {
                     cls_usuario: {
                        select: {
                           usuario: true,
                        },
                     },
                  },
                  orderBy: {
                     fecha_registro: "desc",
                  },
               },
            },
            where: {
               nombre: {
                  contains: nombre,
               },
               activo: case_where_activo,
            },
            orderBy: {
               fecha_actualizacion: "desc",
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
               nombre: "asc",
            },
         });
         return result;
      });
   }
}
