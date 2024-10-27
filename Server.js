import express, { json } from "express";
import mongoose from "mongoose";
import authRoutes from "./routes/auth.js"; // Rutas de autenticación.
import userRoutes from "./routes/user.js"; // Rutas de usuario.
import { PORT, DB_USER, SECRETKEY } from "./helpers/config.js";
 
class Server {

    constructor() {
        this.port = PORT;
        this.app = express();
        this.conectarBD();
        this.cargarMiddlewares();
        this.cargarRutas();
    }

    listen() {
        this.app.listen(this.port,() => {
            console.log("Servidor en marcha en el puerto: " + this.port);
        })
    }

    cargarRutas() {
        this.app.use("/api/auth", authRoutes);
        this.app.use("/api/user", userRoutes);
    }

    cargarMiddlewares () {
        this.app.use(json());
    }

    async conectarBD() {
        const user = DB_USER;
        const password = SECRETKEY;
        const mongoUri =  `mongodb+srv://${user}:${password}@cluster0.pssra.mongodb.net/portafolioWeb?retryWrites=true&w=majority&appName=Cluster0`

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