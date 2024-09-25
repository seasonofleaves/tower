<script setup>
import { eventsService } from '@/services/EventsService.js';
import { logger } from '@/utils/Logger.js';
import Pop from '@/utils/Pop.js';
import { onMounted } from 'vue';

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
      <h1>Events</h1>
    </div>
  </section>
 </div>
</template>

<style scoped lang="scss">

</style>
