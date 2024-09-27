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
    <div class="card-body">
      <section class="row">
        <div class="col-2">
          <img class="creator-img" :src="comment.creator.picture" :alt="comment.creator.name">
        </div>
        <div class="col-8">
          <p class="fw-bold">{{ comment.creator.name }}</p>
          <p class="m-0">{{ comment.body }}</p>
        </div>
      </section>
      <div class="text-end">
        <button @click="deleteComment(comment.id)" class="btn btn-danger">Remove</button>
      </div>
    </div>
    </div>
    
   
  
</template>


<style lang="scss" scoped>
.creator-img{
  width: 50px;
  height: 50px;
  border-radius: 50%;
  aspect-ratio: 1/1;
  object-fit: cover;
  object-position: center;
}

</style>