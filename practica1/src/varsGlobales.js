import { config } from "dotenv";

config(); // Llamada obligatoria a la funcion al inicio de todo
export const globales = () => {
  console.log("process.env.PUERTO: ", process.env.PUERTO);
  console.log("process.env.PASS: ", process.env.PASS);
};
