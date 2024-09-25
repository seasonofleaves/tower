<script setup>
import { eventsService } from '@/services/EventsService.js';
import { logger } from '@/utils/Logger.js';
import Pop from '@/utils/Pop.js';
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';


const route = useRoute()
const router = useRouter()

const typeOptions = ['concert', 'convention', 'sport', 'digital']
const eventData = ref({
  name: '',
  description: '',
  coverImg: '',
  location: '',
  capacity: '',
  startDate: '',
  type: '',
})

//TODO - create form in the template to call this function

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
<h1>Form</h1>
</template>


<style lang="scss" scoped>

</style>