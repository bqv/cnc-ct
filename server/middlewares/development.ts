import { resolve } from "path";
import webpack from "webpack";
import webpackDevMiddleware from "webpack-dev-middleware";
import webpackHotMiddleware from "webpack-hot-middleware";
import logger from "../logger";

const webpackConfig = () => require("../../../config/webpack.config.dev");
const compiler = webpack(webpackConfig());

export default function setup(app: any) {
  app.use(
    webpackDevMiddleware(compiler, {
      logger,
      publicPath: webpackConfig().output.publicPath,
      stats: {
        colors: true
      }
    })
  );

  app.use(webpackHotMiddleware(compiler));

  // all other requests be handled by UI itself
  app.get('*', (req: any, res: any) => res.sendFile(resolve(__dirname, '..', '..', '..', 'build-dev', 'client', 'index.html')));
};
