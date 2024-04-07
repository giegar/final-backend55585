import { MessagesDao } from "../DAO/index.js";

export const getMessages = async () => await MessagesDao.getMessages();

export const saveMessages = async (data) => await MessagesDao.saveMessages(data);