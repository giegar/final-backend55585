import MsgModel from "../models/messages.model.js";

export const getMessages = async () => { await MsgModel.find() };

export const saveMessages = async (data) => { await MsgModel.create({...data}) };