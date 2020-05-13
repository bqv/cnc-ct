import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import http from "http";
import bodyParser from "body-parser";
import setupApiRoutes from "./middlewares/api";
import setupDevelopmentAppRoutes from "./middlewares/development";
import setupProductionAppRoutes from "./middlewares/production";
import logger from "./logger";

// execption stack
function onUnhandledError(err: Error) {
  try {
    logger.error(err);
  } catch (e) {
    console.log('LOGGER ERROR:', e); // tslint:disable-line:no-console
    console.log('APPLICATION ERROR:', err); // tslint:disable-line:no-console
  }
  process.exit(1);
}

process.on('unhandledRejection', onUnhandledError);
process.on('uncaughtException', onUnhandledError);

// init config
dotenv.config();
process.env.NODE_ENV = process.env.NODE_ENV || 'development';
process.env.HTTP_PORT = process.env.HTTP_PORT || "3000";
const app = express();

// application routes
app.use(helmet());
app.use(cors());

app.set('env', process.env.NODE_ENV);
logger.info(`Application env: ${process.env.NODE_ENV}`);

app.use(logger.expressMiddleware);
app.use(bodyParser.json());

setupApiRoutes(app);
if (process.env.NODE_ENV === 'development') {
  setupDevelopmentAppRoutes(app);
} else {
  setupProductionAppRoutes(app);
}

http.createServer(app).listen(process.env.HTTP_PORT, () => {
  logger.info(`HTTP server is now running on http://localhost:${process.env.HTTP_PORT}`);
});
