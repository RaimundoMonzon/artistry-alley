// Funcion de orden superior para manejar las peticiones asíncronas.
// Maneja los errores asíncronos, y se los pasa al middleware de Express.
// Nos evita tener que poner un try/catch en cada función de controlador.
export const asyncHandler = (controller) => (req, res, next) => {
  Promise.resolve(controller(req, res, next)).catch(next);
};