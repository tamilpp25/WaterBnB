import express from "express";
import cookieParser from "cookie-parser"
import bodyParser from "body-parser"
import cors from "cors"
import comporession from "compression"
import Config from "./utils/Config";
import registerRoutes from "./router";
import { connect } from "./db/database";

connect();

const app = express();

app.use(cors({
    credentials: true,
    origin: "http://localhost:3000"
}))

app.use(comporession())
app.use(cookieParser())
app.use(bodyParser.json())

registerRoutes(app);

app.listen(Config.HTTP.HTTP_PORT, Config.HTTP.HTTP_HOST, () => {
    console.log(`Server running on http://${Config.HTTP.HTTP_HOST}:${Config.HTTP.HTTP_PORT}`)
})