import { messagesByLang as msg } from "./messages.js";

export const handleError = ((err, res) => {
  const {
    name = msg.internalError,
    statusCode = 500,
    message = msg.internalError,
  } = err;
  return res.status(statusCode).json({
    name,
    status: "ERROR",
    statusCode,
    message,
  });
});

const createErrorFactory = function (name, statusCode) {
  return class CustomizedError extends Error {
    constructor (message) {
      super();
      this.name = name;
      this.message = message;
      this.statusCode = statusCode;
    }
  };
};

export const ValidationError = createErrorFactory("ValidationError", 400); // Indica que el servidor no puede procesar la request porque la request no es válida.
export const NotFound = createErrorFactory("NotFound", 404); // Indica que la request no se puede completar porque no se encuentra el recurso.
export const Unauthorized = createErrorFactory("Unauthorized", 401); // Indica que la request no se puede completar porque no tiene credenciales.