import { Request, Response, NextFunction } from "express";

export async function autenticacion(
   req: Request,
   res: Response,
   next: NextFunction
) {
   const token = req.headers.authorization;

   if (!token) {
      return res.status(401).json({ message: "Authentication required" });
   }

   // const user = await Usuario.findOne({ where: { token } });

   // if (!user) {
   // 	return res.status(401).json({ message: "Invalid token" });
   // }

   //   req.user = user;

   return next();
}
