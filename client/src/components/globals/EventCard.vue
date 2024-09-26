<script setup>
import { Event } from '@/models/Event.js';

const props = defineProps({ event: {type: Event, required: true}})

</script>


<template>
  <router-link :to="{name: 'EventDetails', params: {eventId: event.id}}" :title="`Go to ${event.name}'s details page!'`">
   <div class="card my-2">
      <img :src="event.coverImg" class="card-img-top" alt="Event cover image">
      
      <div class="card-body">
        <h5 class="card-title">{{ event.name }}</h5>
        <p v-if="event.creator" class="card-text">Hosted by {{ event.creator.name }}</p>
        <p>{{ event.startDate.toDateString() }} - {{ event.location }}</p>
        <p>Capacity : {{ event.capacity }}</p>
      </div>
      <div v-if="event.isCanceled == true">
        <span class="bg-danger">Event is cancelled</span>
      </div>
    </div>
  </router-link>
</template>


<style lang="scss" scoped>
img{
  height: 10em;
  object-fit: cover;
  object-position: center;
}
</style>