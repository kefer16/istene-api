import { Request, Response } from "express";

export class AutenticacionControlller {
   static async generarToken(req: Request, res: Response) {
      // const code_send = uuidv4();
      // let RepuestaJson: RespuestaTokenEntity = new RespuestaTokenEntity();
      // let codigo: number = 200;
      // try {
      // 	await ApiEnvioController.grabarEnvioAPI(code_send, req);
      // 	res.status(200).json(RepuestaJson);
      // } catch (error: any) {
      // 	codigo = 500;
      // 	ErrorController.grabarErrorToken(codigo, error, res);
      // } finally {
      // 	await ApiEnvioController.grabarRespuestaAPI(code_send, res);
      // }
   }
}
