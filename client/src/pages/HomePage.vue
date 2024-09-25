<script setup>
import { AppState } from '@/AppState.js';
import EventForm from '@/components/EventForm.vue';
import EventCard from '@/components/globals/EventCard.vue';
import ModalWrapper from '@/components/ModalWrapper.vue';
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
  <ModalWrapper id="event-form">
    <EventForm/>
  </ModalWrapper>
  <section class="row">
    <div class="col-12">
      <h1>Upcoming Events</h1>
    </div>
  </section>
  <section class="row">
    <div class="col-6 col-md-3">
      <button data-bs-toggle="modal" data-bs-target="#event-form" class="btn bg-info p-0 border-0 w-100">
        <div>Create Event</div>
      </button>
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
