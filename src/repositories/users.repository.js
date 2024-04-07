import { UsersDao } from "../DAO/index.js"

export const getUserById = async (id) => { return await UsersDao.getUserById(id) }

export const getUserEmail = async (email) => { return await UsersDao.getUserEmail(email) };

export const registerUser = async (user) => { return await UsersDao.registerUser(user) };
