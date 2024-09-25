<script setup>

import { eventsService } from '@/services/EventsService.js';
import { logger } from '@/utils/Logger.js';
import Pop from '@/utils/Pop.js';
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';


const route = useRoute()

onMounted(() => {
  getEventById
})

async function getEventById(){
  try {
    const eventId = route.params.eventId
    logger.log('Id of the event from the URL', eventId)
    await eventsService.getEventById(eventId)
  } catch (error) {
    Pop.error(error)
    logger.error(error)
  }
}

</script>

<template>
<h1>Event Details Page</h1>
</template>


<style lang="scss" scoped>

</style>