<script setup>
import { Event } from '@/models/Event.js';
import { computed } from 'vue';

const props = defineProps({ event: {type: Event, required: true}})

const isSoldOut = computed(() => {
  if(props.event.capacity !== props.event.ticketCount) return false
  return true
})

</script>


<template>
  <router-link :to="{name: 'EventDetails', params: {eventId: event.id}}" :title="`Go to ${event.name}'s details page!'`">
   <div class="card my-2 shadow">
      <img :src="event.coverImg" class="card-img-top" alt="Event cover image">
      
      <div class="card-body">
        <h5 class="card-title">{{ event.name }}</h5>
        <p v-if="event.creator" class="card-text">Hosted by {{ event.creator.name }}</p>
        <p>{{ event.startDate.toDateString() }} - {{ event.location }}</p>
        <p>Capacity : {{ event.capacity }}</p>
        <div class="text-end" v-if="event.isCanceled == true">
          <span class="bg-danger rounded-pill">Event is cancelled</span>
        </div>
        <div class="text-end" v-if="isSoldOut">
          <span class="bg-danger rounded-pill">Event is Sold Out</span>
        </div>
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
span{
  padding-left: 10px;
  padding-right: 10px;
}
</style>