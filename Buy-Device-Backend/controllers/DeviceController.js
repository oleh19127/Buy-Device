import { extname, join } from "path";
import { uid } from "uid";
import { writeFile } from "node:fs/promises";
import { Device } from "../db/models.js";

class DeviceController {
  async create(request, reply) {
    const { name, price, brandId, typeId, info, image } = request.raw.body;
    const fileExt = extname(image.name);
    const newFileName = `${uid(36)}${fileExt}`;
    await writeFile(join("static", "images", newFileName), image.data);

    const device = await Device.create({
      name,
      price,
      brandId,
      typeId,
      img: newFileName,
    });

    return reply.send(device);
  }
  async getAll(request, reply) {
    const { brandId, typeId } = request.query;
    let devices;
    if (!brandId && !typeId) {
      devices = await Device.findAll();
    }
    if (brandId && !typeId) {
      devices = await Device.findAll({ where: { brandId } });
    }
    if (!brandId && typeId) {
      devices = await Device.findAll({ where: { typeId } });
    }
    if (brandId && typeId) {
      devices = await Device.findAll({ where: { typeId, brandId } });
    }
    return reply.send(devices);
  }
  async getOne(request, reply) {
    const { id } = request.params;
    const device = await Device.findOne({
      where: { id },
      // include: [{ model: DeviceInfo, as: "info" }],
    });
    return reply.send(device);
  }
}

export const deviceController = new DeviceController();
