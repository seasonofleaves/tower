<script setup>

import { AppState } from '@/AppState.js';
import { eventsService } from '@/services/EventsService.js';
import { logger } from '@/utils/Logger.js';
import Pop from '@/utils/Pop.js';
import { computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';


const route = useRoute()
const event = computed(() => AppState.activeEvent)

onMounted(() => {
  getEventById()
})

// const thereIsAnEvent = computed(() => {
//   if(event.value == null) return false
//   if(event.value != null) return true
//   return
// })

async function getEventById(){
  try {
    await eventsService.getEventById(route.params.eventId)
  } catch (error) {
    Pop.error(error)
    logger.error(error)
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
    <div class="col-7">
      <p>{{ event.description }}</p>
      <h4>Date and Time</h4>
      <p>{{ event.startDate.toLocaleString() }}</p>
      <h4>Location</h4>
      <p>{{ event.location }}</p>
    </div>
  </section>
</div>
</template>


<style lang="scss" scoped>

</style>