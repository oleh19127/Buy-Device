import { deviceController } from "../../controllers/DeviceController.js";

export default async function (fastify, opts) {
  fastify.get("/", deviceController.getAll);
  fastify.post("/", deviceController.create);
  fastify.get("/:id", deviceController.getOne);
}
