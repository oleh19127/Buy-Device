import { dirname, join } from "path";
import AutoLoad from "@fastify/autoload";
import { fileURLToPath } from "url";
import { sequelize } from "./db/index.js";
import "./db/models.js";
import fastifyUpload from "fastify-file-upload";
import fastifyStatic from "@fastify/static";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Pass --options via CLI arguments in command to enable these options.
export const options = {};

export default async function (fastify, opts) {
  // Place here your custom code!

  await sequelize.authenticate();
  await sequelize.sync();

  // File Upload
  fastify.register(fastifyUpload);

  // Static files
  fastify.register(fastifyStatic, {
    root: join(__dirname, "static"),
  });

  // This loads all plugins defined in plugins
  // those should be support plugins that are reused
  // through your application
  fastify.register(AutoLoad, {
    dir: join(__dirname, "plugins"),
    options: Object.assign({}, opts),
  });

  // This loads all plugins defined in routes
  // define your routes in one of these
  fastify.register(AutoLoad, {
    dir: join(__dirname, "routes"),
    options: Object.assign({}, opts),
  });
}
