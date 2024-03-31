<template>
  <Home />
</template>

<script lang="ts">
import 'reset-css';
import { defineComponent } from 'vue';
import Home from './views/Home/Home.vue';

export default defineComponent({
  name: 'App',
  components: {
    Home,
  },
});
</script>
