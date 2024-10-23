import {LANGUAGE} from "./config.js";

const messages = {
    es: {
      // Mensajes de usuario
      validation: "Usuario/Contraseña no validos",
      unauthorized: "Acceso denegado",
      notSufficientPermissions: "No tiene suficientes permisos para hacer esto",
      invalidToken: "El token no es valido",
      tokenNotFound: "Token no encontrado",
      userNotFound: "Usuario no encontrado",
  
      // Mensajes generales
      requiredField () {
        return `Este campo es obligatorio`;
      },
      minLength (minLength) {
        return `El campo debe tener al menos ${minLength} caracteres`;
      },
      maxLength (maxLength) {
        return `El campo debe tener como máximo ${maxLength} caracteres`;
      },
      internalError: "Error de servidor interno",
  
      // Mensajes de las rutas
      routeNotFound: "Ruta no encontrada",
  
      // Mensajes de las obras (ARTWORK)
      artworkNotFound: "Obra no encontrada",
      UserNotProvided: "Usuario no proporcionado",
    },
  };
  
  export const messagesByLang = messages[LANGUAGE];