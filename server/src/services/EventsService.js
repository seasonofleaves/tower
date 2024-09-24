import { dbContext } from "../db/DbContext.js"


class EventsService {
  async editEvent(eventId, eventData) {
    const eventToUpdate = await dbContext.Events.findById(eventId)
    eventToUpdate.name = eventData.name ?? eventToUpdate.name
    eventToUpdate.description = eventData.description ?? eventToUpdate.description
    await eventToUpdate.save()
    return eventToUpdate
  }

  async createEvent(eventData) {
    const event = await dbContext.Events.create(eventData)
    await event.populate('creator')
    return event
  }

  async getAllEvents() {
    const events = await dbContext.Events.find().populate('creator')
    return events
  }

  async getEventById(eventId) {
    const event = await dbContext.Events.findById(eventId).populate('creator')
    //NOTE - good practice to make sure that an invalid eventId doesn't create a silent error
    if (event == null) throw new Error(`No event with id ${eventId}`)
    return event
  }
}

export const eventsService = new EventsService()