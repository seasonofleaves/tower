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
  <section class="row">
    <div class="col-12">
      <h1>{{ event }}</h1>
    </div>
  </section>
</div>
</template>


<style lang="scss" scoped>

</style>