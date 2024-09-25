<script setup>
import { Event } from '@/models/Event.js';

defineProps({ event: {type: Event, required: true}})

</script>


<template>
   <div class="card my-2">
    <router-link :to="{name: 'EventDetails'}" :title="`Go to ${event.name}'s details page!'`">
      <img :src="event.coverImg" class="card-img-top" alt="Event cover image">
    </router-link>
      
    <div class="card-body">
      <h5 class="card-title">{{ event.name }}</h5>
      <p class="card-text">Hosted by {{ event.creator.name }}</p>
      <p>{{ event.startDate.toDateString() }} - {{ event.location }}</p>
      <p>Capacity : {{ event.capacity }}</p>
    </div>
  </div>
</template>


<style lang="scss" scoped>
img{
  height: 10em;
  object-fit: cover;
  object-position: center;
}
</style>