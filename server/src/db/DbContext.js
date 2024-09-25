import mongoose from 'mongoose'
import { AccountSchema } from '../models/Account'
import { EventSchema } from '../models/Event.js';
import { TicketSchema } from '../models/Ticket.js';


class DbContext {

  Tickets = mongoose.model('Ticket', TicketSchema)
  Events = mongoose.model('TowerEvent', EventSchema);
  Account = mongoose.model('Account', AccountSchema);
}

export const dbContext = new DbContext()
