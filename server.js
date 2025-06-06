const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const {S3Client} = require("@aws-sdk/client-s3");
const {query} = require("express-validator");
const {createServer} = require('http');
const {Server} = require('socket.io');
const SocketEvents = require('./src/socket/socketEvents');
require("dotenv").config();

const PORT = process.env.PORT;
const whiteList = [process.env.ORIGIN];

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

app.use(express.json({limit: '25mb'}))
app.use(express.urlencoded({extended: true, limit: '25mb'}))

// Si estás usando body-parser
const bodyParser = require('body-parser')
app.use(bodyParser.json({limit: '25mb'}))
app.use(bodyParser.urlencoded({extended: true, limit: '25mb'}))

app.use(
    cors({
        origin: function (origin, callback) {
            console.log("🌐 Request origin =>", origin || "undefined");

            // Verificar si es una petición web (con origin en whitelist)
            if (origin && whiteList.includes(origin)) {
                console.log("✅ Web App request - Origin autorizado");
                return callback(null, true);
            }

            // Verificar si es una petición móvil (sin origin)
            if (!origin) {
                // Distinguir entre desarrollo y móvil por environment
                if (process.env.NODE_ENV === 'development') {
                    console.log("🔧 Development request - Sin origin");
                } else {
                    console.log("📱 Mobile App request - Sin origin");
                }
                return callback(null, true);
            }

            // Origin no autorizado
            console.log("❌ Origin no autorizado:", origin);
            return callback(new Error(`CORS: Origin ${origin} no autorizado`));
        },
        credentials: true,
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization', 'x-api-key']
    })
);

app.use(express.json());

app.use(cookieParser());
app.use(express.urlencoded({extended: true}));

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
    res.status(404).json({message: "Ruta no encontrada"});
});

const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: function (origin, callback) {
            if (!origin && process.env.NODE_ENV === 'development') {
                return callback(null, true);
            }
            if (!origin) {
                return callback(null, true);
            }
            if (whiteList.includes(origin)) {
                return callback(null, true);
            }
            return callback("Error de CORS origin: " + origin + " No autorizado!");
        },
        credentials: true,
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization', 'x-api-key']
    }
});

app.set('io', io);

const socketEvents = new SocketEvents(io);
socketEvents.initialize();

app.set('socketEvents', socketEvents);

httpServer.listen(PORT, () => {
    console.log(`Server running on: http://localhost:${PORT}`);
    console.log(`Environment: ${process.env.NODE_ENV}`);
});

process.on('unhandledRejection', (err) => {
    console.log('UNHANDLED REJECTION! 💥 Shutting down...');
    console.log(err.name, err.message);
    process.exit(1);
});