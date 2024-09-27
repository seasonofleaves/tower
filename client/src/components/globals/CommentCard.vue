<script setup>
import { Comment } from '@/models/Comments.js';
import { commentsService } from '@/services/CommentsService.js';
import { logger } from '@/utils/Logger.js';
import Pop from '@/utils/Pop.js';
import { useRoute } from 'vue-router';

const route = useRoute()
defineProps({ comment: {type: Comment, required: true}})

async function deleteComment(commentId){
  try {
    const confirmed = await Pop.confirm(`Are you sure you want to delete your comment?`)
    if(!confirmed) return
    await commentsService.deleteComment(commentId)
    Pop.toast("Deleted comment!", 'success', 'center')
  }
  catch (error){
    Pop.error(error)
    logger.log(error)
  }
}

</script>


<template>
  <div class="card">
    <section class="row">
      <div class="col-md-1">
        <img :src="comment.creator.picture" :alt="comment.creator.name">
      </div>
    </section>
    <div class="d-flex">
      <span>{{ comment.creator.name }}</span>
      <p>{{ comment.body }}</p>
    </div>
    <div class="text-end">
      <button @click="deleteComment(comment.id)" class="btn btn-danger">Remove</button>
    </div>
  </div>
</template>


<style lang="scss" scoped>

</style>