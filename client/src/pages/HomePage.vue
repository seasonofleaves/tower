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
  {text: 'all', icon: 'mdi mdi-all-inclusive'},
  {text: 'concert', icon: 'mdi mdi-guitar-electric'},
  {text: 'convention', icon: 'mdi mdi-account-group'},
  {text: 'sport', icon: 'mdi mdi-soccer'},
  {text: 'digital', icon: 'mdi mdi-television'},
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

<!-- 
    <section class="row">
      <div class="col-md-6 align-content-center">
        <div class="text-light hero-text m-3">
          <h3>Event management for people, by people</h3>
          <p>Whatever your interest, from hiking and reading to networking and skill sharing, there are thousands of people who share it on Tower. Events are happening every day - log in to join the fun.</p>
        </div>
      </div>
    </section> -->


<template>
 <div class="container-fluid d-flex hero-bg">
  <section class="row">
    <div class="col-md-6 align-content-center">
        <div class="text-light hero-text m-3">
          <h3>Event management for people, by people</h3>
          <p>Whatever your interest, from hiking and reading to networking and skill sharing, there are thousands of people who share it on Tower. Events are happening every day - log in to join the fun.</p>
        </div>
      </div>
  </section>
</div>
<div class="container">
  
  <ModalWrapper id="event-form">
    <EventForm/>
  </ModalWrapper>
<section class="row">
  <div class="col-12">
    <h4 class="fw-bold my-5">How Tower Works</h4>
  </div>
</section>
<section class="row justify-content-around">
    <div class="col-md-5 mt-2">
      <div class="card how-card">
        <div class="card-body">
          <section class="row">
            <i class="col-1 text-success fs-4 mdi mdi-magnify"></i>
            <div class="col-11">
              <p class="how-text-heading">Discover events you're interested in</p>
              <p class="how-text-body">Browse through community hosted events for all the things you love</p>
            </div>
          </section>
        </div>
      </div>
    </div>
    <div class="col-md-5 mt-2">
      <div class="card how-card">
        <div class="card-body">
          <section class="row">
            <i class="col-1 text-success fs-4 mdi mdi-plus"></i>
            <div class="col-11">
              <p class="how-text-heading">Start an event to invite your friends</p>
              <div class="how-text-body">
                <p>Create your own Tower event, and draw from a community of millions</p>
                <span v-if="account" data-bs-toggle="modal" data-bs-target="#event-form" role="button" class="text-success">Create an event</span>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
</section>
<section class="row">
  <div class="col-12 mt-4">
    <h4 class="fw-bold my-5">Explore Top Categories</h4>
  </div>
</section>
  <section class="row justify-content-around">
    <div v-for="type in filterTypes" :key="type.text" class="col-md-2">
      <button @click="filterBy = type.text" type="button" class="btn filter-btn p-0 border-0 w-100">
        <div class="p-3">
          <div class="fs-1">
            <i :class="`${type.icon}`"></i>
          </div>
          <div class="fs-3 text-black">
            {{ type.text }}
          </div>
        </div>
      </button>
    </div>
  </section>
  <section class="row">
    <div class="col-12 mt-4">
      <h4 class="fw-bold my-5">Upcoming Events</h4>
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
  background-color: rgba(196, 196, 196, 0.351);
  font-weight: 600;
}
.hero-bg{
  background-image: url(/src/assets/img/social_gathering.png);
  background-position: center;
  background-size: cover;
  min-height: 100vh;
}
.how-card{
  background-color: rgba(196, 196, 196, 0.351);
  border: none;
  height: 100%; // NOTE: allows cards to be the same size/take up all of the space in their columns
}
.how-text-heading{
  font-size: x-large;
  font-weight: bold;
}
.how-text-body{
  font-size: large;
  color: rgba(0, 0, 0, 0.558);
  font-weight: bold;
}
.hero-text{
  text-shadow: black 1px 0 3px;
}
</style>
