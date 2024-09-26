import { logger } from "@/utils/Logger.js"
import { api } from "./AxiosService.js"
import { TicketProfiles } from "@/models/Tickets.js"
import { AppState } from "@/AppState.js"


class TicketsService {
  deleteTicket(ticketId) {
    throw new Error('Method not implemented.')
  }
  getAccountTickets() {
    
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