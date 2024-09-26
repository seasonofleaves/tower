import { Account } from "./Account.js"


export class Event {
  constructor(data){
    this.id = data.id
    this.name = data.name
    this.description = data.description
    this.coverImg = data.coverImg
    this.location = data.location
    this.capacity = data.capacity
    this.ticketCount = data.ticketCount
    this.startDate = new Date(data.startDate)
    this.isCanceled = data.isCanceled
    this.type = data.type
    this.creatorId = data.creatorId
    this.createdAt = new Date(data.createdAt)
    this.updatedAt = new Date(data.updatedAt)
    this.creator = data.creator? new Account(data.creator) : null
  }
}

const data = {
  "_id": "66f334c196194bf664e56676",
  "name": "European Horse Pong",
  "description": "Will never, ever, be the same, again! Welcome to Raw Is Jericho! Beat me if you can, survive if I let you. That’s the bottom line because Stone Cold said so! Whatcha gonna do when Hulkamania runs wild on you! I am the ayatollah of rock n rolla! I am the best in the world. I am the best there is, the best there was, and the best there ever will be.",
  "coverImg": "https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=900&q=80",
  "location": "At The Social Expo Center",
  "capacity": 57,
  "startDate": "2024-09-26T06:00:00.000Z",
  "isCanceled": false,
  "type": "sport",
  "creatorId": "66f3263a6fbf3fcb53702407",
  "createdAt": "2024-09-24T21:53:05.865Z",
  "updatedAt": "2024-09-24T21:53:05.865Z",
  "__v": 0,
  "creator": {
      "_id": "66f3263a6fbf3fcb53702407",
      "subs": [
          "auth0|66f3263a4130cf1a40cb2ffc"
      ],
      "email": "mack@mack.com",
      "name": "mack",
      "picture": "https://s.gravatar.com/avatar/f10f61ed7cf91a263c0491caa48872cf?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fma.png",
      "createdAt": "2024-09-24T20:57:20.729Z",
      "updatedAt": "2024-09-24T20:57:20.729Z",
      "__v": 0,
      "id": "66f3263a6fbf3fcb53702407"
  },
  "id": "66f334c196194bf664e56676"
}