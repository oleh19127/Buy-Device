import { brandController } from "../../controllers/BrandController.js";

export default async function (fastify, opts) {
  fastify.get("/", brandController.getAll);
  fastify.post("/", brandController.create);
}
