import express, { json } from "express";
import mongoose from "mongoose";

class Server {

    constructor() {
        this.port = process.env.PORT;
        this.app = express();
        this.cargarMiddlewares();
        this.cargarRutas();
        this.conectarBD();
    }

    listen() {
        this.app.listen(this.port,() => {
            console.log("Servidor en marcha.")
        })
    }

    cargarRutas() {
        this.app.use("/api", require("./routes/auth"));
    }

    cargarMiddlewares () {
        this.app.use(json());
    }

    async conectarBD() {
        const user = process.env.DB_USER;
        const password = process.env.SECRETKEY;
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