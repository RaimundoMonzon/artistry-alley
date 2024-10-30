import {LANGUAGE} from "./config.js";

const messages = {
    es: {
      // Mensajes bonitos para los usuarios.
      loginSuccess: "¡Buenos dias estrellita! ¡El mundo te dice hola!", // ¡Bienvenido! ¡Has iniciado sesión!
      registerSuccess: "¡Bienvenido! ¡Has registrado!",
      deleteUserSuccess: "¡Hasta la vista baby!",

      // Mensajes de Error de Usuario
      invalidCredentials: "Usuario o Contraseña no validos",
      unauthorized: "Rechazado, como digo, fracasado", // Acceso denegado.
      notSufficientPermissions: "Viste, te falta cancha para hacer esto", // No tiene suficientes permisos para hacer esto.
      invalidToken: "El token no es valido",
      tokenNotFound: "Token no encontrado",
      userNotFound: "Usuario no encontrado",
      userAlreadyExists: "El usuario ya existe",

      // Mensajes bonitos para los Artwork.
      deleteArtworkSuccess: "Obra incinerada.",
      
      // Mensajes de Error de Artwork.
      artworkNotFound: "Ostias que se han robado la Mona Lisa.", // Artowrk no encontrada.

      // Mensajes de Error del Carrito.
      cartNotFound: "Carrito no encontrado",
      itemAlreadyInCart: "El artwork ya está en el carrito",
      noSuchItemInCart: "El artwork no está en el carrito",

  
      // Mensajes generales
      requiredField () {
        return `Si no firmas aca, no pasas`; // Este campo es obligatorio.
      },
      minLength (minLength) {
        return `El campo debe tener al menos ${minLength} caracteres`;
      },
      maxLength (maxLength) {
        return `El campo debe tener como máximo ${maxLength} caracteres`;
      },

      internalError: "Pues habra que llamar al desarrollador.", // Error del servidor interno.
  
      // Mensajes de las rutas
      routeNotFound: "Que pasa, te has perdido?", // Ruta no encontrada.
  
    },
  };
  
  export const messagesByLang = messages[LANGUAGE];