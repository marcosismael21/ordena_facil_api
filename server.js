const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { S3Client } = require("@aws-sdk/client-s3");
const { query } = require("express-validator");
require("dotenv").config();

const PORT = process.env.PORT;
const whiteList = [process.env.ORIGIN];
//console.log("lista blanca:", whiteList);

// Configuración del cliente S3
const s3Client = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    }
})

// Middleware para hacer disponible el cliente S3 en toda la aplicación
app.use((req, res, next) => {
    req.s3Client = s3Client;
    next();
})

// Middleware para validar API Key
const validateApiKey = (req, res, next) => {
    const apiKey = req.headers['x-api-key'];
    
    if (!apiKey) {
        return res.status(401).json({ message: "API key requerida" });
    }

    if (req.headers.origin === process.env.ORIGIN && apiKey === process.env.API_KEY_WEB) {
        return next();
    }
    
    if (apiKey === process.env.API_KEY_MOBILE) {
        return next();
    }

    return res.status(401).json({ message: "API key inválida" });
}

app.use(
    cors({
        origin: function (origin, callback) {
            console.log("😲😲😲 Request origin =>", origin)
            // Verificar si es una petición de desarrollo
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

// Aplicar validateApiKey a las rutas que necesiten acceso a S3
app.use('/api', validateApiKey); 

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