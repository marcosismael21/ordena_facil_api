const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");

const { query } = require("express-validator");
require("dotenv").config();

const PORT = process.env.PORT;
const whiteList = [process.env.ORIGIN];
//console.log("lista blanca:", whiteList);

app.use(
    cors({
        origin: function (origin, callback) {
            console.log("😲😲😲 Request origin =>", origin)
            // Verificar si es una petición de desarrollo (Postman, curl, etc.)
            if (!origin && process.env.NODE_ENV === 'development') {
                console.log("Development request");
                return callback(null, true);
            }

            // Verificar si es una petición móvil (sin origin)
            if (!origin) {
                console.log("Mobile App request");
                return callback(null, true);
            }

            // Verificar si es una petición web (con origin en whitelist)
            if (whiteList.includes(origin)) {
                console.log("Web App request");
                return callback(null, true);
            }

            console.log("No entro ...");
            return callback("Error de CORS origin: " + origin + " No autorizado!");
        },
        credentials: true,
    })
);

app.use(express.json());

app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

const db = require("./src/models");
db.sequelize
    .sync()
    .then(() => {
        console.log("Synced db.");
    })
    .catch((err) => {
        console.log("Failed to sync db: " + err.message);
    });

app.get("/", (req, res) => {
    res.send("Hola");
});
const indexRouter = require("./src/routes/index");
const errorHandlerMiddleware = require("./src/middleware/errorHandlerMiddleware");
const logErrorHandlerMiddleware = require("./src/middleware/logErrorHandlerMiddleware");

app.use(indexRouter);
app.use(logErrorHandlerMiddleware);
app.use(errorHandlerMiddleware);

app.use((req, res) => {
    res.status(404).json({ message: "Ruta no encontrada" });
});

app.listen(PORT, () => {
    console.log(`Server running on: http://localhost:${PORT}`);
    console.log(`Environment: ${process.env.NODE_ENV}`);
});

process.on('unhandledRejection', (err) => {
    console.log('UNHANDLED REJECTION! 💥 Shutting down...');
    console.log(err.name, err.message);
    process.exit(1);
});