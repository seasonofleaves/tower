<script setup>
import Navbar from './components/Navbar.vue';
import { AppState } from './AppState.js';

</script>

<template>
  <header class="container-fluid d-flex hero-bg">
    <Navbar />
      <section class="row">
        <div class="col-md-6 align-content-center">
          <div class="text-light hero-text m-3">
            <h3>Event management for people, by people</h3>
            <p>Whatever your interest, from hiking and reading to networking and skill sharing, there are thousands of people who share it on Tower. Events are happening every day - log in to join the fun.</p>
          </div>
        </div>
      </section>
  </header>
  <main>
    <router-view />
  </main>
  <footer class="bg-dark text-light">
    Made with 💖 by Mackelmore
  </footer>
</template>

<style lang="scss">
@import '@/assets/scss/main.scss';
:root {
  --main-height: calc(100vh - 32px - 64px);
}

footer {
  display: grid;
  place-content: center;
  height: 32px;
}
.hero-bg{
  background-image: url(/src/assets/img/social_gathering.png);
  background-position: center;
  background-size: cover;
  min-height: 100vh;
}
.hero-text{
  text-shadow: black 1px 0 3px;
}

</style>
