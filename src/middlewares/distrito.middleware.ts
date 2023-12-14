import { NextFunction, Response, Request } from "express";
import { query } from "express-validator";
import { validacionResult } from "./validacion.middleware";

export const distritoValidacion = [
	query("distrito_id").notEmpty().isNumeric(),
	(req: Request, res: Response, next: NextFunction) => {
		validacionResult(req, res, next);
	},
];
