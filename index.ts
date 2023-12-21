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
import { candidatoRoutes } from "./src/routes/candidato.route";
import { carreraRoutes } from "./src/routes/carrera.route";
import { cadidatoEstadoRoutes } from "./src/routes/candidato_estado.route";

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
app.use("/usuario", usuarioRoutes);
app.use("/operador", operadorRoutes);
app.use("/candidato", candidatoRoutes);
app.use("/carrera", carreraRoutes);
app.use("/candidato_estado", cadidatoEstadoRoutes);
// Authentication middleware for routes that need authentication
// app.use("/authenticated", autenticacion);

// Example route that requires authentication
// app.get("/authenticated/example", (req, res) => {
// 	return res.json({ message: "Authenticated" });
// });

app.listen(port, () =>
   console.log(`Server running on port ${port} + ${process.env.API_HOST}`)
);
