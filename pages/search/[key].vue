<template>
  <Head>
    <title>{{ route.params.key }}</title>
    <Meta
      name="description"
      content="工业产品PDF、目录、样册、手册、样本、型录、catalog、catalogue、datasheet分享与内容搜索"
    />
    <Meta
      name="keywords"
      content="工业品、选型、电子目录、PDF、手册、样本、样册、型录、catalog、catalogue、datasheet"
    />
  </Head>

  <div>搜索详情页{{ JSON.stringify(route.params) }}</div>
</template>
<script lang="ts" setup>
  import { useRoute } from "vue-router";

  const route = useRoute();
  console.log(route.params);
</script>
