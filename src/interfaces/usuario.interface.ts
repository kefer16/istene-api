export interface UsuarioSend {
   usuario_id: string;
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

export interface UsuarioLoginSend {
   usuario_id: string;
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
   cls_privilegio: PrivilegioLogin;
}

export interface PrivilegioLogin {
   privilegio_id: string;
   nombre: string;
   abreviatura: string;
}

export interface UsuarioPasswordLogin {
   contrasenia: string | null;
}
export interface UsuarioHistorialSend {
   usuario_id: string;
   nombre: string;
   apellido: string;
   correo: string;
   usuario: string;
   contrasenia: string | null;
   foto: string;
   fecha_registro: Date;
   activo: boolean;
   fk_privilegio: number;
   direccion: string | null;
   telefono: string | null;
}

export interface ActualizaNombreUsuario {
   nombre: string;
}

export interface ActualizaApellidoUsuario {
   apellido_paterno: string;
   apellido_materno: string;
}
export interface ActualizaCorreoUsuario {
   correo: string;
}
export interface ActualizaDireccionUsuario {
   direccion: string;
}

export interface ActualizaFotoUsuario {
   foto: string;
}
