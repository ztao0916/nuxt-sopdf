<script setup lang="ts">
  import { useRoute } from "vue-router";

  const route = useRoute();

  // 当访问/posts/1时，route.params.id将为1
  console.log(route.params);
</script>

<template>
  <div>
    <h1>我是详情页{{ route.params.uuid }}</h1>
  </div>
</template>
