import { Response } from "express";
import { RespuestaEntity } from "../entities/respuesta.entity";
import {
   obtenerArchivoError,
   obtenerFechaLocal,
} from "../utils/funciones.utils";
import { prisma } from "../config/conexion";
import { Prisma } from "@prisma/client";
import { ErrorProps } from "../interfaces/error.interface";
import { ErrorPersonalizado } from "../entities/errorPersonalizado.entity";

export class ErrorController {
   static async grabarError(
      codigo: number,
      codigo_envio: string,
      error: any,
      res: Response
   ) {
      const errorProps: ErrorProps = {
         esValidacion: false,
         codigo: "",
         linea: 0,
         objeto: "",
         mensaje: "",
         servidor: "",
         fecha_registro: obtenerFechaLocal(),
         fk_usuario: 1,
      };

      if (error instanceof ErrorPersonalizado) {
         errorProps.esValidacion = true;
         errorProps.codigo = "0";
         errorProps.linea = 0;
         errorProps.objeto = obtenerArchivoError(error);
         errorProps.mensaje = error.message;
      } else if (error instanceof Prisma.PrismaClientKnownRequestError) {
         if (String(error.meta?.code) === "5000") {
            errorProps.esValidacion = true;
            errorProps.codigo = String(error.meta?.code);
            errorProps.linea = 0;
            errorProps.objeto = obtenerArchivoError(error);
            errorProps.mensaje = String(error.meta?.message);
            errorProps.servidor = "DATABASE";
         } else {
            errorProps.esValidacion = false;
            errorProps.codigo = String(error.code);
            errorProps.linea = 0;
            errorProps.objeto = obtenerArchivoError(error);
            errorProps.mensaje = String(error.message);
            errorProps.servidor = "DATABASE";
         }
      } else {
         errorProps.esValidacion = false;
         errorProps.codigo = String(error.code);
         errorProps.linea = 0;
         errorProps.objeto = obtenerArchivoError(error);
         errorProps.mensaje = error.message;
         errorProps.servidor = "CODE";
      }

      const respuestaJson: RespuestaEntity<null> = {
         code: codigo,
         data: null,
         error: {
            isValidate: errorProps.esValidacion,
            code: errorProps.esValidacion ? errorProps.codigo : "0",
            message: errorProps.esValidacion
               ? errorProps.mensaje
               : `Hubo un error, brínda el siguiente código al administrador del sistema: [${codigo_envio}] `,
         },
      };

      try {
         await prisma.error.create({
            data: {
               codigo: errorProps.codigo,
               codigo_envio: codigo_envio,
               linea: errorProps.linea,
               objeto: errorProps.objeto,
               mensaje: errorProps.mensaje,
               servidor: errorProps.servidor,
               fecha_registro: errorProps.fecha_registro,
               fk_usuario: errorProps.fk_usuario,
            },
         });

         res.status(codigo).json(respuestaJson);
      } catch (error) {
         console.log(error);
      }
   }

   static async grabarSoloError(error: any) {
      try {
         await prisma.error.create({
            data: {
               codigo: error.parent === undefined ? 0 : error.parent.number,
               codigo_envio: "",
               linea: error.parent.lineNumber,
               objeto: obtenerArchivoError(error),
               mensaje: error.message,
               servidor: error.parent.serverName,
               fecha_registro: obtenerFechaLocal(),
               fk_usuario: 1,
            },
         });
      } catch (error) {
         console.log(error);
      }
   }
}
