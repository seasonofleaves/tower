<script setup>

import { AppState } from '@/AppState.js';
import { eventsService } from '@/services/EventsService.js';
import { ticketsService } from '@/services/TicketsService.js';
import { logger } from '@/utils/Logger.js';
import Pop from '@/utils/Pop.js';
import { computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';


const route = useRoute()
const event = computed(() => AppState.activeEvent)
const ticketerProfiles = computed(() => AppState.ticketProfiles)

onMounted(() => {
  getEventById()
  getEventTicketHolders()
})

async function cancelEvent(){
  try {
    const wantsToCancel = await Pop.confirm(`Are you sure you want to cancel this event?`)
    if(!wantsToCancel) return
    await eventsService.cancelEvent(route.params.eventId)
  } catch (error) {
    Pop.error(error)
    logger.log(error)
  }
}

async function getEventById(){
  try {
    await eventsService.getEventById(route.params.eventId)
  } catch (error) {
    Pop.error(error)
    logger.error(error)
  }
}

async function createTicket(){
  try {
    const ticketData = {
    eventId: route.params.eventId
    }
    await ticketsService.createTicket(ticketData)
  } catch (error) {
    Pop.error(error)
    logger.log(error)
  }
}

async function getEventTicketHolders(){
  try {
    await ticketsService.getEventTicketHolders(route.params.eventId)
  } catch (error) {
    Pop.error(error)
    logger.log(error)
  }
}

</script>

<template>
<div class="container">
  <section v-if="event" class="row">
    <div class="col-12">
      <div class="d-flex justify-content-center">
        <img :src="event.coverImg" alt="Image of event">
      </div>
    </div>
    <div class="col-md-7 d-flex">
      <h1>{{ event.name }}</h1>
      <span class="btn btn-info rounded-pill align-content-center">{{ event.type }}</span>
    </div>
    <div class="col-5">
      <div v-if="event.isCanceled == true">
        <h1>Event is canceled</h1>
      </div>
    </div>
    <div class="col-7">
      <p>{{ event.description }}</p>
      <h4>Date and Time</h4>
      <p>{{ event.startDate.toLocaleString() }}</p>
      <h4>Location</h4>
      <p>{{ event.location }}</p>
    </div>
    <div class="col-5">
      <div>
        <button v-if="event.creator" @click="cancelEvent()" class="btn btn-danger" type="button">Cancel Event</button>
      </div>
      <div>
        Attending: {{ event.ticketCount }}
      </div>
      <div>
        <button @click="createTicket()" class="btn btn-info">
          Get Ticket!
        </button>
      </div>
      <div v-for="ticketer in ticketerProfiles" :key="ticketer.id">
        <img class="ticketer-img" :src="ticketer.profile.picture" alt="" :title="ticketer.profile.name">
      </div>
    </div>
  </section>
</div>
</template>


<style lang="scss" scoped>
.ticketer-img{
  width: 50px;
  aspect-ratio: 1/1;
  object-fit: cover;
  object-position: center;
}
</style>