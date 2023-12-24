import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import * as fs from "fs";
import mercadopago from "mercadopago";
import swaggerUi from "swagger-ui-express";
import { usuarioRoutes } from "./src/routes/usuario.routes";
import { privilegioRoutes } from "./src/routes/privilegio.router";
import { operadorRoutes } from "./src/routes/operador.route";
import { carreraRoutes } from "./src/routes/carrera.route";
import { PostulanteRoutes } from "./src/routes/postulante.route";
import { PostulanteEstadoRoutes } from "./src/routes/postulante_estado.route";
import { ReniecRoutes } from "./src/routes/reniec.route";

dotenv.config();

// Cargar la especificación Swagger desde un archivo JSON
const swaggerDocument = JSON.parse(fs.readFileSync("./swagger.json", "utf-8"));

// Definir la URL base a partir de la variable de entorno
const baseUrl = process.env.API_HOST || "http://localhost:3000";
// Start server and connect to database
const port = process.env.PORT || 3000;
// Agregar la URL base a la especificación Swagger
swaggerDocument.servers = [{ url: baseUrl }];

// Crear una instancia de express
const app = express();
app.use(cors());
mercadopago.configure({
   access_token: process.env.MERCADO_PAGO_ACCESS_TOKEN || "",
});
app.use(bodyParser.json());

// Configurar swagger-ui-express con la especificación y la URL base
app.use("/api-docs", swaggerUi.serve);
app.get(
   "/api-docs",
   swaggerUi.setup(swaggerDocument, {
      swaggerOptions: { url: `${baseUrl}/swagger.json` },
   })
);
// // Configuración de Swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Routes
app.use("/privilegio", privilegioRoutes);
app.use("/reniec", ReniecRoutes);
app.use("/usuario", usuarioRoutes);
app.use("/operador", operadorRoutes);
app.use("/carrera", carreraRoutes);
app.use("/postulante", PostulanteRoutes);
app.use("/postulante_estado", PostulanteEstadoRoutes);

app.listen(port, () =>
   console.log(`Server running on port ${port} + ${process.env.API_HOST}`)
);
