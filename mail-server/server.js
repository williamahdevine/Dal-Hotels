const http = require("http");
const app = require("./app");

const port = process.env.PORT || 35001;

const server = http.createServer(app);

server.listen(port);