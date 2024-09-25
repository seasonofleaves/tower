import { logger } from "@/utils/Logger.js"
import { api } from "./AxiosService.js"
import { AppState } from "@/AppState.js"
import { Event } from "@/models/Event.js"

class EventsService {
  async getAllEvents() {
    const response = await api.get('api/events')
    logger.log('', response.data)
    const newEvents = response.data.map(eventData => new Event(eventData))
    AppState.events = newEvents
  }

}

export const eventsService = new EventsService()