export interface CarreraResponse {
   carrera_id: string;
   nombre: string;
   activo: boolean;
   fecha_registro: Date;
   fk_usuario: string;
}

export interface CarreraListarIndividualResponse {
   carrera_id: string;
   nombre: string;
   descripcion: string;
   activo: boolean;
   fecha_registro: Date;
   fecha_actualizacion: Date;
   fk_usuario: string;
   cls_usuario: {
      usuario: string;
   };
   lst_carrera_historial: CarreraHistorialListarIndividualResponse[];
}

export interface CarreraHistorialListarIndividualResponse {
   cls_usuario: {
      usuario: string;
   };
}

export interface CarreraListarGrupalNombreResponse {
   carrera_id: string;
   nombre: string;
   descripcion: string;
   fecha_registro: Date;
   fecha_actualizacion: Date;
   activo: boolean;
   lst_carrera_historial: CarreraHistorialistarGrupalNombreResponse[];
}

export interface CarreraHistorialistarGrupalNombreResponse {
   cls_usuario: {
      usuario: string;
   };
}
