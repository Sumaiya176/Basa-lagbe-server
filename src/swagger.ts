// src/config/swagger.ts
import swaggerJSDoc from "swagger-jsdoc";

const swaggerOptions: swaggerJSDoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "To-Let API",
      version: "1.0.0",
      description: "API documentation for Bangladeshi Flat Rental Website",
    },
    servers: [
      {
        url: "http://localhost:5000",
      },
    ],
  },
  apis: ["./src/modules/**/*.ts"], // Path to your route files with Swagger comments
};

export const swaggerSpec = swaggerJSDoc(swaggerOptions);
