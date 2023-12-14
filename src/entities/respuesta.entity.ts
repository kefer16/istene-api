export class RespuestaEntity<T> {
   constructor(
      public code: number = 0,
      public data: T | null = null,
      public error: ErrorEntity = new ErrorEntity(false, "0", "")
   ) {}
}

export class ErrorEntity {
   isValidate: boolean;
   code: string;
   message: string;

   constructor(isValidate: boolean, code: string, message: string) {
      this.isValidate = isValidate;
      this.code = code;
      this.message = message;
   }
}
