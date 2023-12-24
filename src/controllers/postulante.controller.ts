import { Request, Response } from "express";
import { prisma } from "../config/conexion";
import { ejecutarOperacion } from "../utils/funciones.utils";
import { ErrorPersonalizado } from "../entities/errorPersonalizado.entity";
import {
   PostulanteListarGrupalDNIResponse,
   PostulanteListarIndividualResponse,
   PostulanteResponse,
} from "../interfaces/responses/postulante.response";
import { PostulanteCarrera } from "../interfaces/responses/postulante_carrera.response";
import { PostulanteHistorialRequest } from "../interfaces/requests/postulante.request";

export class PostulanteController {
   async listarIndividualCantidadPorEstado(req: Request, res: Response) {
      type tipo = number;

      await ejecutarOperacion<tipo>(req, res, async () => {
         const abreviatura: string = String(req.query.abreviatura);

         const case_where =
            abreviatura === "TODOS"
               ? {}
               : {
                    abreviatura: {
                       equals: abreviatura,
                    },
                 };

         const result: tipo = await prisma.postulante.count({
            where: {
               cls_postulante_estado: case_where,
               activo: true,
            },
         });

         return result;
      });
   }

   async listarIndividual(req: Request, res: Response) {
      type tipo = PostulanteListarIndividualResponse | null;

      await ejecutarOperacion<tipo>(req, res, async () => {
         const id: string = String(req.query.postulante_id);

         const result: tipo = await prisma.postulante.findUnique({
            select: {
               postulante_id: true,
               dni: true,
               nombre: true,
               apellido_paterno: true,
               apellido_materno: true,
               direccion: true,
               telefono: true,
               observacion: true,
               activo: true,
               fecha_registro: true,
               fecha_actualizacion: true,
               fk_postulante_estado: true,
               fk_operador: true,
               fk_usuario: true,
               cls_usuario: {
                  select: {
                     usuario: true,
                  },
               },
               lst_postulante_carrera: {
                  select: {
                     postulante_carrera_id: true,
                     numero_opcion: true,
                     activo: true,
                     fk_carrera: true,
                  },
               },
               lst_postulante_historial: {
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
               postulante_id: id,
            },
         });

         return result;
      });
   }

   async eliminarIndividual(req: Request, res: Response) {
      type tipo = PostulanteResponse | null;

      await ejecutarOperacion<tipo>(req, res, async () => {
         const id: string = String(req.query.postulante_id);

         await prisma.postulante_historial.delete({
            where: {
               fk_postulante: id,
            },
         });

         await prisma.postulante_carrera.delete({
            where: {
               fk_postulante: id,
            },
         });

         const result: tipo = await prisma.postulante.delete({
            where: {
               postulante_id: id,
            },
         });
         return result;
      });
   }

   async registrarIndividual(req: Request, res: Response) {
      type tipo = PostulanteResponse;

      await ejecutarOperacion<tipo>(req, res, async () => {
         const {
            dni,
            nombre,
            apellido_paterno,
            apellido_materno,
            direccion,
            telefono,
            observacion,
            activo,
            fecha_registro,
            fecha_actualizacion,
            fk_postulante_estado,
            fk_operador,
            fk_usuario,
         } = req.body;

         const lstpostulanteCarrera: PostulanteCarrera[] =
            req.body.lst_postulante_carrera;

         const clspostulanteHistorial: PostulanteHistorialRequest =
            req.body.cls_postulante_historial;

         const NropostulantesConMismoDni = await prisma.postulante.count({
            where: {
               dni: dni,
            },
         });

         if (NropostulantesConMismoDni > 0) {
            throw new ErrorPersonalizado(
               "Ya existe un postulante con el mismo DNI"
            );
         }

         const result: tipo = await prisma.postulante.create({
            data: {
               dni,
               nombre,
               apellido_paterno,
               apellido_materno,
               direccion,
               telefono,
               observacion,
               activo,
               fecha_registro,
               fecha_actualizacion,
               fk_postulante_estado,
               fk_operador,
               fk_usuario,
            },
         });

         lstpostulanteCarrera.forEach((element) => {
            element.fk_postulante = result.postulante_id;
         });

         await prisma.postulante_carrera.createMany({
            data: lstpostulanteCarrera,
         });

         await prisma.postulante_historial.create({
            data: {
               fecha_registro: clspostulanteHistorial.fecha_registro,
               fk_usuario: clspostulanteHistorial.fk_usuario,
               fk_postulante: result.postulante_id,
            },
         });
         return result;
      });
   }

   async actualizarIndividual(req: Request, res: Response) {
      type tipo = PostulanteResponse;

      await ejecutarOperacion<tipo>(req, res, async () => {
         const id: string = String(req.query.postulante_id);

         const {
            dni,
            nombre,
            apellido_paterno,
            apellido_materno,
            direccion,
            telefono,
            observacion,
            fecha_actualizacion,
            fk_postulante_estado,
            fk_operador,
         } = req.body;

         const lstpostulanteCarrera: PostulanteCarrera[] =
            req.body.lst_postulante_carrera;

         const clspostulanteHistorial: PostulanteHistorialRequest =
            req.body.cls_postulante_historial;

         const NropostulantesConMismoDni = await prisma.postulante.count({
            where: {
               dni: dni,
               NOT: {
                  postulante_id: id,
               },
            },
         });

         if (NropostulantesConMismoDni > 0) {
            throw new ErrorPersonalizado(
               "Ya existe un postulante con el mismo DNI"
            );
         }

         const result: tipo = await prisma.postulante.update({
            data: {
               dni,
               nombre,
               apellido_paterno,
               apellido_materno,
               direccion,
               telefono,
               observacion,
               fecha_actualizacion,
               fk_postulante_estado,
               fk_operador,
            },
            where: {
               postulante_id: id,
            },
         });

         await prisma.postulante_carrera.delete({
            where: {
               fk_postulante: id,
            },
         });

         lstpostulanteCarrera.forEach((element) => {
            element.fk_postulante = id;
         });

         await prisma.postulante_historial.create({
            data: {
               fecha_registro: clspostulanteHistorial.fecha_registro,
               fk_usuario: clspostulanteHistorial.fk_usuario,
               fk_postulante: id,
            },
         });

         await prisma.postulante_carrera.createMany({
            data: lstpostulanteCarrera,
         });

         return result;
      });
   }

   async listarGrupalDNI(req: Request, res: Response) {
      type tipo = PostulanteListarGrupalDNIResponse[];

      await ejecutarOperacion<tipo>(req, res, async () => {
         const dni: string = String(req.query.dni);
         const fk_postulante_estado: string = String(
            req.query.fk_postulante_estado
         );

         const case_where =
            fk_postulante_estado === "-1"
               ? {}
               : {
                    postulante_estado_id: {
                       equals: fk_postulante_estado,
                    },
                 };

         const result: tipo = await prisma.postulante.findMany({
            select: {
               postulante_id: true,
               dni: true,
               nombre: true,
               apellido_paterno: true,
               apellido_materno: true,
               fecha_actualizacion: true,
               cls_postulante_estado: {
                  select: {
                     postulante_estado_id: true,
                     abreviatura: true,
                  },
               },
               lst_postulante_historial: {
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
               lst_postulante_carrera: {
                  select: {
                     cls_carrera: {
                        select: {
                           nombre: true,
                        },
                     },
                  },
                  orderBy: {
                     numero_opcion: "asc",
                  },
               },
            },
            where: {
               dni: {
                  contains: dni,
               },
               cls_postulante_estado: case_where,
            },
            orderBy: {
               fecha_actualizacion: "desc",
            },
         });
         return result;
      });
   }

   async listarGrupalActivos(req: Request, res: Response) {
      type tipo = PostulanteResponse[];

      await ejecutarOperacion<tipo>(req, res, async () => {
         const result: tipo = await prisma.postulante.findMany({
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
