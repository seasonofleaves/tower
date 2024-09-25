<script setup>
import { eventsService } from '@/services/EventsService.js';
import { logger } from '@/utils/Logger.js';
import Pop from '@/utils/Pop.js';
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';


const route = useRoute()
const router = useRouter()

const eventTypes = ['concert', 'convention', 'sport', 'digital']
const eventData = ref({
  name: '',
  description: '',
  coverImg: '',
  location: '',
  capacity: '',
  startDate: '',
  type: '',
})

async function createEvent(){
  try {
    logger.log('creating', eventData.value)
    const createEvent = await eventsService.createEvent(eventData.value)
    resetForm()
    Pop.toast("Event created", 'success', 'top')

  } catch (error) {
    Pop.error(error)
    logger.log(error)
  }
}
function resetForm(){
  eventData.value = {
  name: '',
  description: '',
  coverImg: '',
  location: '',
  capacity: '',
  startDate: '',
  type: '',
}
}

</script>


<template>
<form @submit.prevent="createEvent()" class="row">
  <div class="col-12">
    <h4>Create an Event</h4>
  </div>
  <div class="col-md-4">
    <label for="event-name">Event Name</label>
    <input v-model="eventData.name" class="form-control" type="text" required minlength="3" maxlength="50" name="event-name" id="event-name">
  </div>
  <div class="col-md-4">
    <label for="event-date">Event Date</label>
    <input v-model="eventData.startDate" class="form-control" type="date" required name="event-date" id="event-date">
  </div>
  <div class="col-md-4">
    <label for="event-location">Event Location</label>
    <input v-model="eventData.location" class="form-control" type="text" required minlength="1" maxlength="500" name="event-location" id="event-location">
  </div>
  <div class="col-md-8">
    <label for="event-description">Event Description</label>
    <textarea v-model="eventData.description" class="form-control" required minlength="15" maxlength="1000" name="event-description" id="event-description"></textarea>
  </div>
  <div class="col-md-4">
    <label for="event-capacity">Event Capacity</label>
    <input v-model="eventData.capacity" class="form-control" type="number" required min="1" max="5000" name="event-capacity" id="event-capacity">
  </div>
  <div class="col-md-8">
    <label for="event-image">Cover Image</label>
    <input v-model="eventData.coverImg" class="form-control" type="url" required minlength="10" maxlength="500" name="event-image" id="event-image">
  </div>
  <div class="col-md-4">
    <select v-model="eventData.type" class="form-select" aria-label="Event Type">
      <option v-for="eventType in eventTypes" :key="eventType" value="eventType">
        {{ eventType }}
      </option>
    </select>
  </div>
  <div class="text-end">
    <button class="btn btn-success" type="submit">Create Event</button>
  </div>
</form>
</template>


<style lang="scss" scoped>

</style>