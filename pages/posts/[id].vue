<script setup lang="ts">
  import { useRoute } from "vue-router";

  const route = useRoute();

  // 当访问/posts/1时，route.params.id将为1
  console.log(route.params.id);
</script>

<template>
  <div>
    <h1>{{ route.params.id }}</h1>
  </div>
</template>
