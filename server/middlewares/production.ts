import { resolve } from "path";
import express from "express";
import compression from "compression";

const clientBuildPath = resolve(__dirname, '..', '..', 'client');

export default function setup(app: any) {
  app.use(compression());
  app.use('/', express.static(clientBuildPath));

  // all other requests be handled by UI itself
  app.get('*', (req: any, res: any) => res.sendFile(resolve(clientBuildPath, 'index.html')));
};
