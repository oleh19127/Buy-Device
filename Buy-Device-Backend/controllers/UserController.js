import { Basket, User } from "../db/models.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const generateJWT = (id, email, role) => {
  return jwt.sign({ id, email, role }, process.env.SECRET_KEY, {
    expiresIn: "24h",
  });
};
class UserController {
  async registration(request, reply) {
    const { email, password, role } = request.body;
    const candidate = await User.findOne({ where: { email } });
    const hasPassword = await bcrypt.hash(password, 6);
    const user = await User.create({ email, role, password: hasPassword });
    const basket = await Basket.create({ userId: user.id });
    const token = generateJWT(user.id, email, user.role);
    return reply.send({ token });
  }
  async login(request, reply) {
    const { email, password } = request.body;
    const user = await User.findOne({ where: { email } });
    let comparePassword = await bcrypt.compare(password, user.password);
    if (!comparePassword) {
      return reply.send("Wrong password!!!");
    }
    const token = generateJWT(user.id, user.email, user.role);
    return reply.send({ token });
  }
  async check(request, reply, next) {
    if (request.method === "OPTIONS") {
      next();
    }
    try {
      const token = request.headers.authorization.split(" ")[1];
      if (!token) {
        return reply.status(401).send({ message: "Not authorized" });
      }
      request.user = jwt.verify(token, process.env.SECRET_KEY);
      next();
    } catch (e) {
      return reply.status(401).send({ message: "Not authorized" });
    }
    const token = generateJWT(
      request.user.id,
      request.user.email,
      request.user.role
    );
    return reply.send({ token });
  }
}

export const userController = new UserController();
