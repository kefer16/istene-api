export interface CandidatoCarrera {
   candidato_carrera_id: string;
   numero_opcion: number;
   activo: boolean;
   fk_candidato: string;
   fk_carrera: string;
}
