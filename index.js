import { promises as fs } from "fs";
import cors from "cors";
import express from "express";
import winston from "winston";
import swaggerUi from "swagger-ui-express";
import { swaggerDocument } from "./doc.js";
import accountsRouter from "./routes/account.routes.js";


const app = express();
app.use(express.json());
app.use(cors());
app.use("/doc", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

global.fileName = "accounts.json";

const { combine, timestamp, label, printf } = winston.format;
const customLogFormat = printf(({ level, message, label, timestamp }) => {
    return `${timestamp} [${label}] ${level}: ${message}`;
});
global.logger = winston.createLogger({
    level: "silly",
    transports: [
        new (winston.transports.Console),
        new (winston.transports.File)({ filename: "online-banking-api.log" })
    ],
    format: combine(
        label({ label: "online-banking-api" }),
        timestamp(),
        customLogFormat
    )
});

global.port = 8080;

app.use("/account", accountsRouter);
app.listen(port, async () => {
    try {
        await fs.readFile(fileName,);
        logger.info(`Listening on port ${port}`);
    } catch (err) {
        const initialJson = {
            nextId: 1,
            accounts: []
        };
        try {
            await fs.writeFile(fileName, JSON.stringify(initialJson));
            logger.info(`Listening on port ${port} | File Created`);
        } catch (err) {
            logger.error(`Erro na escrita: ${err}`);
        }
    }
});