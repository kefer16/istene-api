import { Request, Response } from "express";
import { CandidatoResponse } from "../interfaces/responses/candidato.response";
import { prisma } from "../config/conexion";
import { ejecutarOperacion } from "../utils/funciones.utils";
import { ErrorPersonalizado } from "../entities/errorPersonalizado.entity";

export class CandidatoController {
   async listarIndividual(req: Request, res: Response) {
      type tipo = CandidatoResponse | null;

      await ejecutarOperacion<tipo>(req, res, async () => {
         const id: string = String(req.query.candidato_id);

         const result: tipo = await prisma.candidato.findUnique({
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
               fk_operador,
               fk_usuario,
            },
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
            activo,
            fecha_registro,
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
               activo,
               fecha_registro,
               fk_operador,
               fk_usuario,
            },
            where: {
               candidato_id: id,
            },
         });
         return result;
      });
   }

   async listarGrupal(req: Request, res: Response) {
      type tipo = CandidatoResponse[];

      await ejecutarOperacion<tipo>(req, res, async () => {
         const result: tipo = await prisma.candidato.findMany({
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
