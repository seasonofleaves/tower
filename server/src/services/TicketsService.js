import { dbContext } from "../db/DbContext.js"


class TicketsService {
  async createTicket(ticketData) {
    const ticket = await dbContext.Tickets.create(ticketData)
    await ticket.populate('event')
    await ticket.populate('profile')
    return ticket
  }

  async getMyTickets(userId){
    const tickets = await dbContext.Tickets.find({accountId: userId}).populate('event')
    return tickets
  }

}

export const ticketsService = new TicketsService()