import { logger } from "@/utils/Logger.js"
import { api } from "./AxiosService.js"
import { AppState } from "@/AppState.js"
import { Event } from "@/models/Event.js"

class EventsService {
  async createEvent(eventData) {
    const response = await api.post(`api/events`, eventData)
    const createEvent = new Event(response.data)
    AppState.events.push(createEvent)
    return createEvent
  }
  
  async getEventById(eventId) {
    const response = await api.get(`api/events/${eventId}`)
    logger.log('Got event - event service', response.data)
    AppState.activeEvent = new Event(response.data)
  }

  async getAllEvents() {
    const response = await api.get('api/events')
    logger.log('', response.data)
    const newEvents = response.data.map(eventData => new Event(eventData))
    AppState.events = newEvents
  }

}

export const eventsService = new EventsService()