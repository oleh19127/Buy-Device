import { Brand } from "../db/models.js";

class BrandController {
  async create(request, reply) {
    const { name } = request.body;
    const brand = await Brand.create({ name });
    return reply.send(brand);
  }
  async getAll(request, reply) {
    const brands = await Brand.findAll();
    return reply.send(brands);
  }
}

export const brandController = new BrandController();
