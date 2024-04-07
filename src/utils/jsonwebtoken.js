import jwt from "jsonwebtoken";
import config from "../config/config.js";

export const generateToken = (user, expireTime='8h') => {
    try {
        return jwt.sign({ ...user }, config.JWT_SECRET_KEY, { expiresIn: expireTime });
        
    } catch(error) {
        console.log(error);
        throw error;
    }
}