<script setup>
import { AppState } from '@/AppState.js';
import EventForm from '@/components/EventForm.vue';
import EventCard from '@/components/globals/EventCard.vue';
import ModalWrapper from '@/components/ModalWrapper.vue';
import { eventsService } from '@/services/EventsService.js';
import { logger } from '@/utils/Logger.js';
import Pop from '@/utils/Pop.js';
import { computed, onMounted, ref } from 'vue';

const filterBy = ref('all')
const account = computed(() => AppState.account)
const events = computed(() => {
  if(filterBy.value == 'all'){
    return AppState.events
  }
  return AppState.events.filter(event => event.type == filterBy.value)
})

const filterTypes = [
  {text: 'all'},
  {text: 'concert'},
  {text: 'convention'},
  {text: 'sport'},
  {text: 'digital'},
]

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
    <h4>Filter by your interests</h4>
    <hr/>
  </section>
  <section class="row justify-content-around">
    <div v-for="type in filterTypes" :key="type.text" class="col- col-md-2">
      <button @click="filterBy = type.text" type="button" class="btn filter-btn p-0 border-0 w-100">
        <div class="p-3">
          {{ type.text }}
        </div>
      </button>
    </div>
  </section>
  <section class="row">
    <div class="col-12">
      <h1>Upcoming Events</h1>
    </div>
  </section>
  <section class="row">
    <div class="col-6 col-md-3">
      <button v-if="account" data-bs-toggle="modal" data-bs-target="#event-form" class="btn bg-info p-0 border-0 w-100">
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
.filter-btn{
  color: white;
  background-color: rgb(102, 94, 155);
  font-weight: 600;
}
</style>
