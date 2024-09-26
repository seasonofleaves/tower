import { Account } from "./Account.js"

export class Comment {
  constructor(data) {
    this.id = data.id
    this.creatorId = data.creatorId
    this.creator = new Account(data.creator)
    this.eventId = data.eventId
    this.body = data.body
  }
}