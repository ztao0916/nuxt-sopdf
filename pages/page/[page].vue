<template>
  <div>
    <Items :items="posts?.data"></Items>
    <el-pagination
      layout="pager, next"
      next-text="下一页"
      :total="posts?.total"
      :default-page-size="2"
      v-model:current-page="page"
      @current-change="handleCurrentChange"
    />
  </div>
</template>
<script lang="ts" setup>
  import { useRoute } from "vue-router";

  interface Post {
    [key: string]: any;
  }
  definePageMeta({
    key: (route) => route.fullPath,
  });

  const route = useRoute();
  console.log(route.params);
  const page = ref(1);
  const { data: posts, refresh } = await useAsyncData("posts", () =>
    $useFetch<Post>("/lastRelease", {
      server: false,
      query: {
        page: page.value,
        limit: 2,
      },
    })
  );
  console.log("data:post", posts.value?.data, posts.value?.total);
  //分页
  const handleCurrentChange = (val: number) => {
    console.log(`current page: ${val}`);
    page.value = val;
    console.log(page.value);
    refresh();
  };
</script>
