import { logger } from "@/utils/Logger.js"
import { api } from "./AxiosService.js"
import { TicketProfiles } from "@/models/Tickets.js"
import { AppState } from "@/AppState.js"


class TicketsService{
  async createTicket(ticketData) {
    const response = await api.post('api/tickets', ticketData)
    logger.log('Creating Ticket', response.data)
    const createdTicket = new TicketProfiles(response.data)
    AppState.ticketProfiles.push(createdTicket)
    AppState.activeEvent.ticketCount++
  }

}

export const ticketsService = new TicketsService()