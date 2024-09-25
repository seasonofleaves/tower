<script setup>
import { Event } from '@/models/Event.js';
import { eventsService } from '@/services/EventsService.js';
import { logger } from '@/utils/Logger.js';
import Pop from '@/utils/Pop.js';

const props = defineProps({ event: {type: Event, required: true}})

// async function cancelEvent(){
//   try {
//     const wantsToCancel = await Pop.confirm(`Are you sure you want to cancel this event?`)
//     if(!wantsToCancel) return
//     await eventsService.cancelEvent(props.event.id)
//   } catch (error) {
//     Pop.error(error)
//     logger.log(error)
//   }
// }

</script>


<template>
  <router-link :to="{name: 'EventDetails', params: {eventId: event.id}}" :title="`Go to ${event.name}'s details page!'`">
   <div class="card my-2">
      <img :src="event.coverImg" class="card-img-top" alt="Event cover image">
      
      <div class="card-body">
        <h5 class="card-title">{{ event.name }}</h5>
        <p class="card-text">Hosted by {{ event.creator.name }}</p>
        <p>{{ event.startDate.toDateString() }} - {{ event.location }}</p>
        <p>Capacity : {{ event.capacity }}</p>
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