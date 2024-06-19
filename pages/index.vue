<template>
  <div class="mx-6 mb-4 bg-white w-[800px]">
    <div class="flex flex-col items-center">
      <h1 class="text-6xl font-semibold text-gray-800">这里是首页</h1>
      <div class="my-4 flex space-x-4">
        <NuxtLink to="/about">前往 About</NuxtLink>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  const route = useRoute();

  const data = await useFetch(`/api/web/index`, {
    server: false,
  });
  console.log(data);
</script>
