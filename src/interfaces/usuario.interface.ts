export interface UsuarioResponse {
   usuario_id: string;
   dni: string;
   nombre: string;
   apellido_paterno: string;
   apellido_materno: string;
   correo: string;
   usuario: string;
   contrasenia: string | null;
   foto: string;
   fecha_registro: Date;
   activo: boolean;
   fk_privilegio: string;
   direccion: string;
   telefono: string;
}

export interface UsuarioListarIndividualResponse {
   usuario_id: string;
   dni: string;
   nombre: string;
   apellido_paterno: string;
   apellido_materno: string;
   correo: string;
   usuario: string;
   fecha_registro: Date;
   direccion: string;
   telefono: string;
}

export interface UsuarioLoginResponse {
   usuario_id: string;
   dni: string;
   nombre: string;
   apellido_paterno: string;
   apellido_materno: string;
   correo: string;
   usuario: string;
   foto: string;
   activo: boolean;
   fk_privilegio: string;
   direccion: string;
   telefono: string;
   cls_privilegio: PrivilegioLoginResponse;
}

export interface PrivilegioLoginResponse {
   privilegio_id: string;
   nombre: string;
   abreviatura: string;
}

export interface UsuarioPasswordLogin {
   contrasenia: string | null;
}

export interface ActualizaFotoUsuario {
   foto: string;
}
