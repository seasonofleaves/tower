import { logger } from "@/utils/Logger.js"
import { api } from "./AxiosService.js"
import { TicketProfiles, TicketsPerEvent } from "@/models/Tickets.js"
import { AppState } from "@/AppState.js"


class TicketsService {
  async deleteTicket(ticketId) {
    const response = await api.delete(`api/tickets/${ticketId}`)
    logger.log('Deleting ticket', response.data)
    const indexToDelete = AppState.eventTickets.findIndex(ticket => ticket.id == ticketId)
    AppState.eventTickets.splice(indexToDelete, 1)
  }
  async getAccountTickets() {
    const response = await api.get(`account/tickets`)
    logger.log('Getting account tickets', response.data)
    const accountTickets = response.data.map(ticketData => new TicketsPerEvent(ticketData))
    AppState.eventTickets = accountTickets
  }
  async getEventTicketHolders(eventId) {
    const response = await api.get(`api/events/${eventId}/tickets`)
    logger.log('Ticket holders found', response.data)
    const ticketHolders = response.data.map(ticketData => new TicketProfiles(ticketData))
    AppState.ticketProfiles = ticketHolders
  }
  async createTicket(ticketData) {
    const response = await api.post('api/tickets', ticketData)
    logger.log('Creating Ticket', response.data)
    const createdTicket = new TicketProfiles(response.data)
    AppState.ticketProfiles.push(createdTicket)
    AppState.activeEvent.ticketCount++
  }

}

export const ticketsService = new TicketsService()