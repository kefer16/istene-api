# ISTENE API

api de aplicacion ISTENE, desplegada en Railway

## Previsualización

previsualizacion de `despliegue utilizando Swagger`

![Imagen despliegue Api ](./src/assets/images/istene-swagger.jpeg)

## Instalar Dependencias

```bash
  npm install
```

## Configurar Variables de Entorno

### 1. Crear arhivo .env

crear arhivo .env en la raiz del proyecto, con las siguientes variables:

```js
//VARIABLE = "VALOR" // EJEMPLO
DB_SERVER = ""; // SERVERDB
DB_USER = ""; // USERDB
DB_PASSWORD = ""; // PASSWORDDB
```

### 2. Configurar variables de entorno

estas variables se tienen que configurar para que pueda cargar el proyecto, tener en cuenta que el proyecto se configuró con `SQL SERVER`
| variable | descripcion |
| :- | :- |
| `DB_SERVER` | `Nombre del servidor de BD` |
| `DB_USER` | `Usuario de login de BD` |
| `DB_PASSWORD`| `Contraseña de login de BD` |

## Iniciar Proyecto

despues de configurar las variables ya podemos correr la API en modo desarrollo

```bash
  npm run dev
```
