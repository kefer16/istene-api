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
   fk_candidato_estado: string;
   fk_operador: string;
   fk_usuario: string;
}

export interface CandidatoListarGrupalDNIResponse {
   candidato_id: string;
   dni: string;
   nombre: string;
   apellido_paterno: string;
   apellido_materno: string;
   fecha_registro: Date;
   cls_candidato_estado: {
      candidato_estado_id: string;
      nombre: string;
   };
   cls_usuario: {
      usuario: string;
   };
}

export interface CandidatoListarIndividualResponse {
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
   fk_candidato_estado: string;
   fk_operador: string;
   fk_usuario: string;
   cls_usuario: {
      usuario: string;
   };
   lst_candidato_carrera: CandidatoCarreraListarIndividualResponse[];
}

export interface CandidatoCarreraListarIndividualResponse {
   candidato_carrera_id: string;
   numero_opcion: number;
   activo: boolean;
   fk_candidato: string;
}
