import { typeController } from "../../controllers/TypeController.js";

export default async function (fastify, opts) {
  fastify.get("/", typeController.getAll);
  fastify.post("/", typeController.create);
}
