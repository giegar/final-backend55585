import { TicketDao } from "../DAO/index.js"

export const getTicketById = async (id) => { return await TicketDao.getTicketById(id) };

export const getTicketByEmail = async (email) => { return await TicketDao.getTicketByEmail(email) };

export const createTicket = async (ticket) => { await TicketDao.createTicket(ticket), console.log(ticket) };