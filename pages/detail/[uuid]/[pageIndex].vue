<template>我是{{ JSON.stringify(route.params) }}</template>
<script lang="ts" setup>
  import { useRoute } from "vue-router";

  const route = useRoute();
  console.log(route.params);
</script>
