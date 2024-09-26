import { logger } from "@/utils/Logger.js"
import { api } from "./AxiosService.js"


class TicketsService{
  async createTicket(ticketData) {
    const response = await api.post('api/tickets', ticketData)
    logger.log('Creating Ticket', response.data)
  }

}

export const ticketsService = new TicketsService()