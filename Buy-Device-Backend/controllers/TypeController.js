import { Type } from "../db/models.js";

class TypeController {
  async create(request, reply) {
    const { name } = request.body;
    const type = await Type.create({ name });
    return reply.send(type);
  }
  async getAll(request, reply) {
    const types = await Type.findAll();
    return reply.send(types);
  }
}

export const typeController = new TypeController();
