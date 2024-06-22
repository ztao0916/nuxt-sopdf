<template>
  <Head>
    <title>SOPDF-工业产品PDF样册分享与内容搜索</title>
    <Meta
      name="description"
      content="工业产品PDF、目录、样册、手册、样本、型录、catalog、catalogue、datasheet分享与内容搜索"
    />
    <Meta
      name="keywords"
      content="工业品、选型、电子目录、PDF、手册、样本、样册、型录、catalog、catalogue、datasheet"
    />
  </Head>
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
  const logindata = await $useFetch(`/lastRelease`, {
    server: false,
  });
  console.log(logindata);
</script>
