import jwt from "jsonwebtoken";
import env from "../configs/env.js";

export const verifyToken = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    jwt.verify(token, env.JWT_SECRET, (error, decode) => {
      if (error) {
        throw createHttpError.Forbidden(error.message);
      }
      req.user = decode;
      next();
    });
  } catch (error) {
    next(error);
  }
};
