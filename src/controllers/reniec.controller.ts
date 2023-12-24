import { Request, Response } from "express";
import { ReniecResponse } from "../interfaces/responses/reniec.response";
import { ejecutarOperacion } from "../utils/funciones.utils";
import axios from "axios";
import dotenv from "dotenv";
import { ErrorPersonalizado } from "../entities/errorPersonalizado.entity";

dotenv.config();
const reniecUrl = process.env.RENIEC_URL || "";
const reniecToken = process.env.RENIEC_TOKEN || "";

export class ReniecController {
   async buscarDNI(req: Request, res: Response) {
      type tipo = ReniecResponse | null;

      await ejecutarOperacion<tipo>(req, res, async () => {
         const dni: string = String(req.query.dni);
         console.log(dni);

         const config = {
            headers: {
               "Content-Type": "application/json",
               Accept: "application/json",
               Authorization: `Bearer ${reniecToken}`,
            },
         };
         let data: any;
         try {
            data = await axios.get(`${reniecUrl}/dni?numero=${dni}`, config);
         } catch (error: any) {
            console.log(error.response.status);
            if (error.response.status === 404) {
               throw new ErrorPersonalizado("No se encontró el DNI en RENIEC");
            }
            if (error.response.status === 422) {
               throw new ErrorPersonalizado("No se encontró el DNI en RENIEC");
            }
            if (error.response.status === 502) {
               throw new ErrorPersonalizado("El APIKEY de RENIEC expiró");
            }
            throw new ErrorPersonalizado("Ocurró un error al consultar RENIEC");
         }

         const dataReniec: ReniecResponse = {
            nombres: data.data.nombres,
            apellidoPaterno: data.data.apellidoPaterno,
            apellidoMaterno: data.data.apellidoMaterno,
         };
         return dataReniec;
      });
   }
}
