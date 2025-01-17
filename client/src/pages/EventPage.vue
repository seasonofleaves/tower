<script setup>

import { AppState } from '@/AppState.js';
import CommentCard from '@/components/globals/CommentCard.vue';
import { commentsService } from '@/services/CommentsService.js';
import { eventsService } from '@/services/EventsService.js';
import { ticketsService } from '@/services/TicketsService.js';
import { logger } from '@/utils/Logger.js';
import Pop from '@/utils/Pop.js';
import { computed, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute()
const account = computed(() => AppState.account)
const comments = computed(() => AppState.comments)
const event = computed(() => AppState.activeEvent)
const ticketerProfiles = computed(() => AppState.ticketProfiles)
const commentData = ref({
  body: '',
  eventId: route.params.eventId
})

const isAttendingEvent = computed(() =>{
  if (AppState.identity == null) return false
  const youAreAttending = AppState.ticketProfiles.find(ticket => ticket.accountId == AppState.account?.id)
  if(!youAreAttending) return false
  return true
})

const canAttendEvent = computed(() => {
  if(AppState.identity == null) return false
  if(isAttendingEvent.value) return false
  if(AppState.activeEvent?.isCanceled == true) return false
  if(AppState.activeEvent.capacity == AppState.activeEvent.ticketCount) return false
  return true
})

const isSoldOut = computed(() => {
  if(AppState.activeEvent.capacity !== AppState.activeEvent.ticketCount) return false
  return true
})

onMounted(() => {
  getEventById()
  getEventTicketHolders()
  getAllEventComments()
})

async function cancelEvent(){
  try {
    const wantsToCancel = await Pop.confirm(`Are you sure you want to cancel this event?`)
    if(!wantsToCancel) return
    await eventsService.cancelEvent(route.params.eventId)
  } catch (error) {
    Pop.error(error)
    logger.log(error)
  }
}

async function getEventById(){
  try {
    await eventsService.getEventById(route.params.eventId)
  } catch (error) {
    Pop.error(error)
    logger.error(error)
  }
}

async function createTicket(){
  try {
    const ticketData = {
    eventId: route.params.eventId
    }
    await ticketsService.createTicket(ticketData)
  } catch (error) {
    Pop.error(error)
    logger.log(error)
  }
}

async function getEventTicketHolders(){
  try {
    await ticketsService.getEventTicketHolders(route.params.eventId)
  } catch (error) {
    Pop.error(error)
    logger.log(error)
  }
}

async function getAllEventComments(){
  try {
    await commentsService.getAllEventComments(route.params.eventId)
  }
  catch (error){
    Pop.error(error)
    logger.log(error)
  }
}

async function createComment(){
  try {
    logger.log('Creating comment', commentData.value)
    const createComment = await commentsService.createComment(commentData.value)
    resetCommentForm()
    Pop.toast("Comment posted!", 'success', 'top')
  } catch (error) {
    Pop.error(error)
    logger.log(error)
  }
}

function resetCommentForm(){
  commentData.value = {
    body: '',
    eventId: route.params.eventId
  }
}

</script>

<template>
<div class="container">
  <section v-if="event" class="row">
    <div class="col-12">
      <div class="d-flex justify-content-center">
        <img class="img-fluid cover-img" :src="event.coverImg" alt="Image of event">
      </div>
    </div>
    <div class="col-md-7 d-flex justify-content-between">
      <h1>{{ event.name }}</h1>
      <div class="align-content-center">
       <span class="bg-info rounded-pill align-content-center">{{ event.type }}</span>
      </div>
    </div>
    <div class="col-4">
      <div v-if="event.isCanceled == true">
        <p class="fs-4 m-1 bg-danger text-center rounded-pill">Event is canceled</p>
      </div>
      <div v-if="isSoldOut">
        <h1>Event is SOLD OUT</h1>
      </div>
    </div>
    <div class="col-7">
      <p>{{ event.description }}</p>
      <div v-if="event.isCanceled == false">
        <h4>Date and Time</h4>
        <p>{{ event.startDate.toLocaleString() }}</p>
        <h4>Location</h4>
        <p>{{ event.location }}</p>
      </div>
    </div>
    <div class="col-5">
      <div>
        <button v-if="event.creator.id == account?.id" @click="cancelEvent()" class="btn btn-danger" type="button">Cancel Event</button>
      </div>
      <div>
        Attending: {{ event.ticketCount }}
      </div>
      <div>
        <button v-if="!isAttendingEvent" :disabled="!canAttendEvent" @click="createTicket()" class="btn btn-info">
          Get Ticket!
        </button>
        <p v-if="isAttendingEvent">You are attending this event!</p>
      </div>
      <div v-for="ticketer in ticketerProfiles" :key="ticketer.id">
        <img class="ticketer-img" :src="ticketer.profile.picture" alt="" :title="ticketer.profile.name">
      </div>
    </div>
  </section>
  <section class="row">
    <div class="col-12">
      <h4>See what people are saying...</h4>
    </div>
    <div class="col-md-7">
      <div class="card p-3">
        <div v-if="account">
          <form v-if="event.isCanceled == false" @submit.prevent="createComment()">
            <div class="text-end">
              <label for="comment-body">Join the conversation</label>
            </div>
            <textarea v-model="commentData.body" class="form-control" minlength="1" maxlength="500" name="comment-body" id="comment-body"></textarea>
            <div class="text-end">
              <button class="btn btn-info" type="submit">Post Comment</button>
            </div>
          </form>
        </div>
        <div v-for="comment in comments" :key="comment.id">
          <CommentCard :comment="comment"/>
        </div>
      </div>
    </div>
  </section>
</div>
</template>


<style lang="scss" scoped>
.ticketer-img{
  width: 50px;
  aspect-ratio: 1/1;
  object-fit: cover;
  object-position: center;
}

span{
  padding-left: 2em;
  padding-right: 2em;
  padding-top: 5px;
  padding-bottom: 5px;
}

.cover-img{
  width: 90%;
  max-height: 50vh;
  object-fit: cover;
  object-position: center;
}
</style>