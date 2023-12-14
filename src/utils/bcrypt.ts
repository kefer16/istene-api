import bcrypt from "bcrypt";

export const encriptar = async (contrasenia: string): Promise<string> => {
   const hash = await bcrypt.hash(contrasenia, 10);
   return hash;
};

export const comparar = async (
   contrasenia_plana: string,
   contrasenia_encriptada: string
): Promise<boolean> => {
   const valido = await bcrypt.compare(
      contrasenia_plana,
      contrasenia_encriptada
   );
   return valido;
};
