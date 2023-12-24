import { Router } from "express";
import { ReniecController } from "../controllers/reniec.controller";

const router = Router();
const ctlReniec = new ReniecController();

//individual
router.get("/buscar_dni", ctlReniec.buscarDNI);

export { router as ReniecRoutes };
