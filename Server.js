import express, { json } from "express";
import mongoose from "mongoose";
import authRoutes from "./routes/auth.js"; // Rutas de autenticación.
import userRoutes from "./routes/user.js"; // Rutas de usuario.
import cartRoutes from "./routes/cart.js"; // Rutas de carrito.
import artworkRoutes from "./routes/artwork.js"; // Rutas de obras.
import contactRoutes from "./routes/contact.js"; // Rutas de contacto.
import categoryRoutes from "./routes/category.js"; // Rutas de categorias.
import exhibitionRoutes from "./routes/exhibition.js"; // Rutas de exposiciones.
import paymentRoutes from "./routes/payment.js";
import { PORT, DB_USER, SECRETKEY, CART_MAXAGE } from "./helpers/config.js";
import { handleError } from "./helpers/errorHandler.js";
import session from "express-session";

class Server {

    constructor() {
        this.port = PORT;
        this.app = express();
        this.conectarBD();
        this.loadPreMiddlewares();
        this.cargarRutas();
        this.loadPostMiddlewares();
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log("Servidor en marcha en el puerto: " + this.port);
        })
    }

    loadPreMiddlewares() {
        this.app.use(json());
        this.app.use(session({
            secret: SECRETKEY,
            resave: false,
            saveUninitialized: false,
            rolling: true, // Reinicia el tiempo de caducidad de la cookie con cada petición.
            cookie: { 
                maxAge: CART_MAXAGE, // Tiempo de caducidad de la cookie en milisegundos. 1 hora.
                secure: false // Solo se puede acceder a través de HTTPS.
            }
        }));
    }

    cargarRutas() {
        // Rutas generales para testear.
        this.app.use("/api/auth", authRoutes);
        this.app.use("/api/user", userRoutes);
        this.app.use("/api/cart", cartRoutes);
        this.app.use("/api/artwork", artworkRoutes);
        this.app.use("/api/contact", contactRoutes);
        this.app.use("/api/category", categoryRoutes);
        this.app.use("/api/exhibition", exhibitionRoutes);
        this.app.use("/api/payment", paymentRoutes);
    }

    loadPostMiddlewares() {
        // Middleware para manejar errores. Express lo detecta como tal por los 4 parametros.
        this.app.use((error, req, res, next) => {
            handleError(error, res);
        });
    }

    async conectarBD() {
        const user = DB_USER;
        const password = SECRETKEY;
        const mongoUri = `mongodb+srv://${user}:${password}@cluster0.pssra.mongodb.net/portafolioWeb?retryWrites=true&w=majority&appName=Cluster0`

        try {
            await mongoose.connect(mongoUri);
            console.log("Conexion con la Base de Datos establecida.");
        } catch (e) {
            console.log("Error al conectar con la Base de Datos.");
            console.log("Error: " + e);
        }

    }
}

export default Server;