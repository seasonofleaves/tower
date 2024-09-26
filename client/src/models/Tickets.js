import { Profile } from "./Profile.js"

export class Tickets{
  constructor(data){
    this.id = data.id
    this.eventId = data.eventId
    this.accountId = data.accountId
  }
}

export class TicketsProfile extends Tickets{
  constructor(data){
    super(data)
    this.profile = new Profile(data.profile)
  }
}

export class TicketsPerEvent extends Tickets{
  constructor(data){
    super(data)
    this.event = new Event(data.event)
  }
}