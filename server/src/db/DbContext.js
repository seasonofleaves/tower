import mongoose from 'mongoose'
import { AccountSchema } from '../models/Account'
import { EventSchema } from '../models/Event.js';
import { TicketSchema } from '../models/Ticket.js';
import { CommentSchema } from '../models/Comment.js';


class DbContext {
  Comments = mongoose.model('Comment', CommentSchema)
  Tickets = mongoose.model('Ticket', TicketSchema)
  Events = mongoose.model('TowerEvent', EventSchema);
  Account = mongoose.model('Account', AccountSchema);
}

export const dbContext = new DbContext()
