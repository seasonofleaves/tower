import { dbContext } from "../db/DbContext.js"
import { Forbidden } from "../utils/Errors.js"


class TicketsService {
  async createTicket(ticketData) {
    const ticket = await dbContext.Tickets.create(ticketData)
    await ticket.populate('event')
    await ticket.populate('profile')
    return ticket
  }

  async getMyTickets(userId) {
    const tickets = await dbContext.Tickets.find({ accountId: userId }).populate('event')
    return tickets
  }

  async getTicketsByEvent(eventId) {
    const tickets = await dbContext.Tickets.find({ eventId: eventId }).populate('profile')
    return tickets
  }

  async deleteTicket(ticketId, userId) {
    const ticketToDelete = await dbContext.Tickets.findById(ticketId)
    if (!ticketToDelete) throw Error(`Could not delete, no ticket with id: ${ticketId}`)
    if (userId != ticketToDelete.accountId) throw new Forbidden(`Not your ticket to delete`)
    await ticketToDelete.deleteOne()
    return 'You gave up your ticket to this event'
  }


}

export const ticketsService = new TicketsService()