import { Request, Response } from "express";

// import { ApiEnvioModel } from "../models/apienvio.models";
import { obtenerFechaLocal } from "../utils/funciones.utils";
import { ErrorController } from "./error.controlller";
import { prisma } from "../config/conexion";
import { RespuestaEntity } from "../entities/respuesta.entity";
import { RespuestaTokenEntity } from "../entities/respuestacredenciales.entity";

export class ApiEnvioController {
	static async grabarEnvioAPI(code_send: string, req: Request) {
		try {
			await prisma.api_envio.create({
				data: {
					codigo_envio: code_send,
					tipo_peticion: req.method.toString() ?? "",
					url: "http://" + req.headers.host?.toString() + req.originalUrl.toString(),
					parametros: JSON.stringify(req.query) ?? "",
					llave: req.headers.authorization?.toString() ?? "",
					cabeceras: JSON.stringify(req.headers) ?? "",
					tipo_contenido: req.headers["content-type"]?.toString() ?? "",
					cuerpo: JSON.stringify(req.body) ?? "", // solo grabar la respuesta recortada
					respuesta: "",
					agente: req.headers["user-agent"]?.toString() ?? "",
					fecha_creacion: obtenerFechaLocal(),
					fk_usuario: 1,
					estatus: 0,
				},
			});
		} catch (error) {
			ErrorController.grabarSoloError(error);
		}
	}

	static async grabarRespuestaAPI<T>(
		code_send: string,
		res: Response,
		data?: RespuestaEntity<T> | RespuestaTokenEntity
	) {
		try {
			await prisma.api_envio.create({
				data: {
					codigo_envio: code_send,
					tipo_peticion: "",
					url: "",
					parametros: "",
					llave: "",
					cabeceras: "",
					tipo_contenido: "",
					cuerpo: "",
					respuesta: JSON.stringify(data) ?? "", //solo grabar la respuesta recortada
					agente: "",
					fecha_creacion: obtenerFechaLocal(),
					fk_usuario: 1,
					estatus: res.statusCode ?? 0,
				},
			});
			
		} catch (error) {
			ErrorController.grabarSoloError(error);
		}
	}
}
