<script setup>
import { computed, onMounted } from 'vue';
import { AppState } from '../AppState.js';
import Pop from '@/utils/Pop.js';
import { logger } from '@/utils/Logger.js';
import { ticketsService } from '@/services/TicketsService.js';
import EventCard from '@/components/globals/EventCard.vue';

const account = computed(() => AppState.account)
const ticketsPerEvent = computed(() => AppState.eventTickets)

onMounted(() => {
  getAccountTickets()
})

async function getAccountTickets(){
  try {
    await ticketsService.getAccountTickets()
  } catch (error) {
    Pop.error(error)
    logger.log(error)
  }
}

async function deleteTicket(ticketId){
try {
  const confirmed = await Pop.confirm("Are you sure you want to relinquish your ticket?")
  if(!confirmed) return
  await ticketsService.deleteTicket(ticketId)
  Pop.toast("No longer attending", 'success', 'center')
} catch (error) {
  Pop.error(error)
  logger.log(error)
}
}

</script>

<template>
  <div class="container">
    <div class="about text-center">
      <div v-if="account">
        <h1>Welcome {{ account.name }}</h1>
        <img class="rounded" :src="account.picture" alt="" />
        <p>{{ account.email }}</p>
        <section class="row g-3">
          <div v-for="ticket in ticketsPerEvent" :key="ticket.id" class="col-md-4">
            <EventCard :event="ticket.event"/>
            <button @click="deleteTicket(ticket.id)" class="btn btn-danger">Leave Event</button>
          </div>
        </section>
  
      </div>
      <div v-else>
        <h1>Loading... <i class="mdi mdi-loading mdi-spin"></i></h1>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
img {
  max-width: 100px;
}
</style>
