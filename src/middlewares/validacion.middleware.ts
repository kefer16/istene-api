import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";

export function validacionResult(
	req: Request,
	res: Response,
	next: NextFunction
) {
	try {
		validationResult(req).throw();
		return next();
	} catch (e: any) {
		res.status(403).send({ validators: e.errors });
	}
}
