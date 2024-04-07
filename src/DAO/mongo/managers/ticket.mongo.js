import TicketModel from "../models/ticket.model.js"

export const getTicketById = async (id) => { return await TicketModel.findById(id) };

export const getTicketByEmail = async (email) => { return await TicketModel.findOne({ purchase:email }) };

export const createTicket = async (ticket) => { await TicketModel.create({...ticket}) };


