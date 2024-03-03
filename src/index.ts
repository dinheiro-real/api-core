import { HttpServer } from "./configs/server";

require('dotenv').config();

const SERVER_PORT = Number(process.env.SERVER_PORT || 3000);
new HttpServer(SERVER_PORT).setup();
