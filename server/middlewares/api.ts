// API
import path from "path";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { trackRouter, artistRouter } from "../api/router";

export default function setup(app: any) {
  app.use("/api/track", trackRouter);
  app.use("/api/artist", artistRouter);
  app.use("/.api-docs", swaggerUi.serve, (req: any, res: any, next: any) => {
    const swaggerDocument = require("../swagger.json");
    swaggerDocument.host = req.get('host');
    return swaggerUi.setup(swaggerDocument, { explorer: true })(req, res, next);
  });

//// configure express to use ejs
// app.set("views", path.join(__dirname, "views"));
// app.set("view engine", "ejs");
//
//// define a route handler for the default home page
// app.get("/", (req, res) => {
//  res.render("index");
// });
};
