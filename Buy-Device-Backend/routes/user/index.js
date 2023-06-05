import { userController } from "../../controllers/UserController.js";

export default async function (fastify, opts) {
  fastify.post("/registration", userController.registration);
  fastify.post("/login", userController.login);
  fastify.get("/auth", userController.check);
}
