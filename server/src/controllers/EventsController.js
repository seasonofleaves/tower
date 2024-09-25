import auth0provider, { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController.js";
import { eventsService } from "../services/EventsService.js";


export class EventsController extends BaseController {
  constructor() {
    super('api/events')
    this.router
      .get('', this.getAllEvents)
      .get('/:eventId', this.getEventById)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createEvent)
      .put('/:eventId', this.editEvent)
      .delete('/:eventId', this.cancelEvent)
  }
  async createEvent(request, response, next) {
    try {
      const eventData = request.body
      const userInfo = request.userInfo
      eventData.creatorId = userInfo.id
      const event = await eventsService.createEvent(eventData)
      response.send(event)
    } catch (error) {
      next(error)
    }
  }

  async getAllEvents(request, response, next) {
    try {
      const events = await eventsService.getAllEvents()
      response.send(events)
    } catch (error) {
      next(error)
    }
  }

  async getEventById(request, response, next) {
    try {
      const eventId = request.params.eventId
      const event = await eventsService.getEventById(eventId)
      response.send(event)
    } catch (error) {
      next(error)
    }
  }

  async editEvent(request, response, next) {
    try {
      const eventId = request.params.eventId
      const eventData = request.body
      const event = await eventsService.editEvent(eventId, eventData)
      response.send(event)
    } catch (error) {
      next(error)
    }
  }

  async cancelEvent(request, response, next) {
    try {
      const eventId = request.params.eventId
      const userId = request.userInfo.id
      const message = await eventsService.cancelEvent(eventId, userId)
      response.send(message)
    } catch (error) {
      next(error)
    }
  }
}