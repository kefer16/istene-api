import { ErrorEntity } from "./respuesta.entity";

export class RespuestaTokenEntity {
   code: number;
   data: string;
   error?: ErrorEntity;

   constructor(
      code: number = 0,
      data: string = "",
      error: ErrorEntity = new ErrorEntity(false, "0", "")
   ) {
      this.code = code;
      this.data = data;
      this.error = error;
   }
}
