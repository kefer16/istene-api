import { Request, Response } from "express";
import { RespuestaEntity } from "../entities/respuesta.entity";
import { ApiEnvioController } from "../controllers/apienvio.controller";
import { v4 as uuidv4 } from "uuid";
import { ErrorController } from "../controllers/error.controlller";
import { prisma } from "../config/conexion";

export const obtenerFechaLocal = () => {
   var local = new Date();
   local.setMinutes(local.getMinutes() - local.getTimezoneOffset());
   return local.toJSON();
};

export const obtenerArchivoError = (error: any) => {
   const stackTrace = error.stack;
   const fileNameMatches = stackTrace.match(/at\s+.+\((.+):\d+:\d+\)/);

   if (fileNameMatches && fileNameMatches.length > 1) {
      const fileName = fileNameMatches[1];
      return fileName;
   } else {
      return "";
   }
};
export async function ejecutarOperacion<T>(
   req: Request,
   res: Response,
   operacion: () => Promise<T>
) {
   const code_send = uuidv4();
   let respuestaJson: RespuestaEntity<T> = new RespuestaEntity();

   try {
      prisma.$connect;
      await ApiEnvioController.grabarEnvioAPI(code_send, req);

      const result = await operacion();

      respuestaJson = {
         code: 200,
         data: result,
         error: {
            isValidate: false,
            code: "0",
            message: "",
         },
      };
      res.status(200).json(respuestaJson);
   } catch (error: any) {
      await ErrorController.grabarError(400, code_send, error, res);
   } finally {
      await ApiEnvioController.grabarRespuestaAPI(code_send, res);
      prisma.$disconnect;
   }
}
