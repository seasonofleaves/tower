import { dbContext } from "../db/DbContext.js"


class EventsService {
  async createEvent(eventData) {
    const event = await dbContext.Events.create(eventData)
    await event.populate('creator')
    return event
  }

}

export const eventsService = new EventsService()