import Server from "./Server";

const server = new Server();

server.listen();
server.cargarMiddlewares();
server.cargarRutas();
server.conectarBD();