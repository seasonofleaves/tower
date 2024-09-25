import { logger } from "@/utils/Logger.js"
import { api } from "./AxiosService.js"

class EventsService {
  async getAllEvents() {
    const response = await api.get('api/events')
    logger.log('Got all events - events service', response.data)
  }

}

export const eventsService = new EventsService()