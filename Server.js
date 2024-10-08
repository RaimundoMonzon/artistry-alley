const express = require("express");

class Server {

    constructor() {
        this.port = process.env.PORT;
        this.app = express();
        this.cargarMiddlewares();
        this.cargarRutas();
        this.conectarABD();
    }

    listen() {
        this.app.listen(this.port,() => {
            console.log("Running")
        })
    }

    cargarRutas() {
        this.api("/api", require('./routes/auth'))
    }
}
