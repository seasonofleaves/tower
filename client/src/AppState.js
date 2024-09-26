import { reactive } from 'vue'
// NOTE AppState is a reactive object to contain app level data
export const AppState = reactive({
  /**@type {import('@bcwdev/auth0provider-client').Identity} */
  identity: null,
  /** @type {import('./models/Account.js').Account} user info from the database*/
  account: null,
  /**@type {import ('./models/Event.js').Event[]}*/
  events: [],
  /**@type {import ('./models/Event.js').Event} */
  activeEvent: null,
  /**@type {import ('./models/Tickets.js').TicketProfiles[]} */
  ticketProfiles: [],
  /**@type {import('./models/Tickets.js').TicketsPerEvent[]} */
  eventTickets: [],
  /**@type {import('./models/Comments.js').Comment[]} */
  comments: [],
})

