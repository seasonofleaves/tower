<script setup>
import { AppState } from '@/AppState.js';
import EventCard from '@/components/globals/EventCard.vue';
import { eventsService } from '@/services/EventsService.js';
import { logger } from '@/utils/Logger.js';
import Pop from '@/utils/Pop.js';
import { computed, onMounted } from 'vue';

const events = computed(() => AppState.events)

onMounted(() => {
  getAllEvents()
})

async function getAllEvents(){
  try {
    await eventsService.getAllEvents()
  } catch (error) {
    Pop.error(error)
    logger.error(error)
  }
}

</script>

<template>
 <div class="container">
  <section class="row">
    <div class="col-12">
      <h1>Upcoming Events</h1>
    </div>
  </section>
  <section class="row">
    <div v-for="event in events" :key="event.id" class="col-md-4">
      <EventCard :event="event"/>
    </div>
  </section>
 </div>
</template>

<style scoped lang="scss">

</style>
