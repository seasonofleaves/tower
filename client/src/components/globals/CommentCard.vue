<script setup>
import { Comment } from '@/models/Comments.js';


defineProps({ comment: {type: Comment, required: true}})

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
      <button class="btn btn-danger">Remove</button>
    </div>
  </div>
</template>


<style lang="scss" scoped>

</style>