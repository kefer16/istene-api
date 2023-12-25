export interface PostulanteResponse {
   postulante_id: string;
   dni: string;
   nombre: string;
   apellido_paterno: string;
   apellido_materno: string;
   direccion: string;
   telefono: string;
   observacion: string;
   activo: boolean;
   fecha_registro: Date;
   fk_postulante_estado: string;
   fk_operador: string;
   fk_usuario: string;
}

export interface PostulanteListarGrupalDNIResponse {
   postulante_id: string;
   dni: string;
   nombre: string;
   apellido_paterno: string;
   apellido_materno: string;
   fecha_actualizacion: Date;
   cls_postulante_estado: {
      postulante_estado_id: string;
      abreviatura: string;
   };
   lst_postulante_historial: PostulanteHistorialListarGrupalDNIResponse[];
   lst_postulante_carrera: PostulanteCarreraListarGrupalDNIResponse[];
}

export interface PostulanteHistorialListarGrupalDNIResponse {
   cls_usuario: {
      usuario: string;
   };
}
export interface PostulanteCarreraListarGrupalDNIResponse {
   cls_carrera: {
      nombre: string;
   };
}

export interface PostulanteListarIndividualResponse {
   postulante_id: string;
   dni: string;
   nombre: string;
   apellido_paterno: string;
   apellido_materno: string;
   direccion: string;
   telefono: string;
   observacion: string;
   activo: boolean;
   fecha_registro: Date;
   fk_postulante_estado: string;
   fk_operador: string;
   fk_usuario: string;
   cls_usuario: {
      usuario: string;
   };
   lst_postulante_carrera: PostulanteCarreraListarIndividualResponse[];
   lst_postulante_historial: PostulanteHistorialListarIndividualResponse[];
}

export interface PostulanteCarreraListarIndividualResponse {
   postulante_carrera_id: string;
   numero_opcion: number;
   activo: boolean;
   fk_carrera: string;
}

export interface PostulanteHistorialListarIndividualResponse {
   cls_usuario: {
      usuario: string;
   };
}

export interface PostulanteReportesListarGrupal {
   dni: string;
   nombre: string;
   apellido_paterno: string;
   apellido_materno: string;
   telefono: string;
   cls_postulante_estado: {
      nombre: string;
   };
   cls_operador: {
      nombre: string;
   };
   cls_usuario: {
      usuario: string;
   };
   lst_postulante_carrera: PostulanteCarreraReporteListarGrupal[];
}

export interface PostulanteCarreraReporteListarGrupal {
   cls_carrera: {
      nombre: string;
   };
}
