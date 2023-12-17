export interface CandidatoResponse {
   candidato_id: string;
   dni: string;
   nombre: string;
   apellido_paterno: string;
   apellido_materno: string;
   direccion: string;
   telefono: string;
   observacion: string;
   activo: boolean;
   fecha_registro: Date;
   fk_operador: string;
   fk_usuario: string;
}
