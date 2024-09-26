import { dbContext } from "../db/DbContext.js"
import { Forbidden } from "../utils/Errors.js"


class EventsService {
  async editEvent(eventId, eventData) {
    const eventToUpdate = await dbContext.Events.findById(eventId)
    if (eventId.isCanceled) throw new Error(`This event is canceled`)
    eventToUpdate.name = eventData.name ?? eventToUpdate.name
    eventToUpdate.description = eventData.description ?? eventToUpdate.description
    await eventToUpdate.save()
    return eventToUpdate
  }

  async createEvent(eventData) {
    const event = await dbContext.Events.create(eventData)
    await event.populate('creator')
    await event.populate('ticketCount')
    return event
  }

  async getAllEvents() {
    const events = (await dbContext.Events.find().populate('creator').populate('ticketCount'))
    return events
  }

  async getEventById(eventId) {
    const event = await (await dbContext.Events.findById(eventId).populate('creator')).populate('ticketCount')
    //NOTE - good practice to make sure that an invalid eventId doesn't create a silent error
    if (event == null) throw new Error(`No event with id ${eventId}`)
    return event
  }

  async cancelEvent(eventId, userId) {
    const eventToCancel = await this.getEventById(eventId)
    if (userId != eventToCancel.creatorId) throw new Forbidden("Invalid credentials")
    eventToCancel.isCanceled = !eventToCancel.isCanceled
    await eventToCancel.save()
    return 'Event has been canceled'
  }
}

export const eventsService = new EventsService()