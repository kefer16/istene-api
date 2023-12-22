import { Request, Response } from "express";
import {
   CandidatoListarGrupalDNIResponse,
   CandidatoListarIndividualResponse,
   CandidatoResponse,
} from "../interfaces/responses/candidato.response";
import { prisma } from "../config/conexion";
import { ejecutarOperacion } from "../utils/funciones.utils";
import { ErrorPersonalizado } from "../entities/errorPersonalizado.entity";
import { CandidatoCarrera } from "../interfaces/responses/candidato_carrera.response";

export class CandidatoController {
   async listarIndividual(req: Request, res: Response) {
      type tipo = CandidatoListarIndividualResponse | null;

      await ejecutarOperacion<tipo>(req, res, async () => {
         const id: string = String(req.query.candidato_id);

         const result: tipo = await prisma.candidato.findUnique({
            select: {
               candidato_id: true,
               dni: true,
               nombre: true,
               apellido_paterno: true,
               apellido_materno: true,
               direccion: true,
               telefono: true,
               observacion: true,
               activo: true,
               fecha_registro: true,
               fk_candidato_estado: true,
               fk_operador: true,
               fk_usuario: true,
               cls_usuario: {
                  select: {
                     usuario: true,
                  },
               },
               lst_candidato_carrera: {
                  select: {
                     candidato_carrera_id: true,
                     numero_opcion: true,
                     activo: true,
                     fk_carrera: true,
                  },
               },
            },
            where: {
               candidato_id: id,
            },
         });

         return result;
      });
   }

   async eliminarIndividual(req: Request, res: Response) {
      type tipo = CandidatoResponse | null;

      await ejecutarOperacion<tipo>(req, res, async () => {
         const id: string = String(req.query.candidato_id);

         await prisma.candidato_carrera.delete({
            where: {
               fk_candidato: id,
            },
         });

         const result: tipo = await prisma.candidato.delete({
            where: {
               candidato_id: id,
            },
         });
         return result;
      });
   }

   async registrarIndividual(req: Request, res: Response) {
      type tipo = CandidatoResponse;

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
            fk_candidato_estado,
            fk_operador,
            fk_usuario,
         } = req.body;

         const NroCandidatosConMismoDni = await prisma.candidato.count({
            where: {
               dni: dni,
            },
         });

         if (NroCandidatosConMismoDni > 0) {
            throw new ErrorPersonalizado(
               "Ya existe un candidato con el mismo DNI"
            );
         }

         const result: tipo = await prisma.candidato.create({
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
               fk_candidato_estado,
               fk_operador,
               fk_usuario,
            },
         });

         const lstCandidatoCarrera: CandidatoCarrera[] =
            req.body.lst_candidato_carrera;

         lstCandidatoCarrera.forEach((element) => {
            element.fk_candidato = result.candidato_id;
         });

         await prisma.candidato_carrera.createMany({
            data: lstCandidatoCarrera,
         });

         return result;
      });
   }

   async actualizarIndividual(req: Request, res: Response) {
      type tipo = CandidatoResponse;

      await ejecutarOperacion<tipo>(req, res, async () => {
         const id: string = String(req.query.candidato_id);

         const {
            dni,
            nombre,
            apellido_paterno,
            apellido_materno,
            direccion,
            telefono,
            observacion,
            fk_candidato_estado,
            fk_operador,
            fk_usuario,
         } = req.body;

         const NroCandidatosConMismoDni = await prisma.candidato.count({
            where: {
               dni: dni,
               NOT: {
                  candidato_id: id,
               },
            },
         });

         if (NroCandidatosConMismoDni > 0) {
            throw new ErrorPersonalizado(
               "Ya existe un candidato con el mismo DNI"
            );
         }

         const result: tipo = await prisma.candidato.update({
            data: {
               dni,
               nombre,
               apellido_paterno,
               apellido_materno,
               direccion,
               telefono,
               observacion,
               fk_candidato_estado,
               fk_operador,
               fk_usuario,
            },
            where: {
               candidato_id: id,
            },
         });

         await prisma.candidato_carrera.delete({
            where: {
               fk_candidato: id,
            },
         });

         const lstCandidatoCarrera: CandidatoCarrera[] =
            req.body.lst_candidato_carrera;

         lstCandidatoCarrera.forEach((element) => {
            element.fk_candidato = id;
         });

         await prisma.candidato_carrera.createMany({
            data: lstCandidatoCarrera,
         });

         return result;
      });
   }

   async listarGrupalDNI(req: Request, res: Response) {
      type tipo = CandidatoListarGrupalDNIResponse[];

      await ejecutarOperacion<tipo>(req, res, async () => {
         const dni: string = String(req.query.dni);

         const result: tipo = await prisma.candidato.findMany({
            select: {
               candidato_id: true,
               dni: true,
               nombre: true,
               apellido_paterno: true,
               apellido_materno: true,
               fecha_registro: true,
               cls_candidato_estado: {
                  select: {
                     candidato_estado_id: true,
                     abreviatura: true,
                  },
               },
               cls_usuario: {
                  select: {
                     usuario: true,
                  },
               },
            },
            where: {
               dni: {
                  contains: dni,
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
      type tipo = CandidatoResponse[];

      await ejecutarOperacion<tipo>(req, res, async () => {
         const result: tipo = await prisma.candidato.findMany({
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
