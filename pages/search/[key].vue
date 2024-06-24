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
  <div class="flex flex-col items-center">
    <div class="mx-6 mb-4 bg-sopdf-700 w-[800px]">
      <!-- 数量展示 -->
      <div class="w-full bg-sopdf-600 h-full py-1 px-2.5">
        <div class="w-full my-2 text-xs text-sopdf-400">
          找到<span class="text-red-600">{{ searchData?.total }}</span
          >个结果:
        </div>
        <div class="items-container">
          <Items :items="searchData?.data"></Items>
        </div>
      </div>
      <div class="w-full bg-sopdf-600 py-1 px-2.5 flex justify-end">
        <el-pagination
          layout="pager, next"
          next-text="下一页"
          :default-page-size="10"
          :total="searchData?.total"
          v-model:current-page="currentPage"
          @current-change="handleCurrentChange"
        />
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
  interface Post {
    [key: string]: any;
  }
  const route = useRoute();
  const currentPage = ref(1); //当前页码
  //请求接口
  //获取到首页数据
  const { data: searchData, refresh } = await useAsyncData("searchData", () =>
    $useFetch<Post>("/search", {
      server: false,
      query: {
        key: route.params.key, //参数是搜索的内容
        page: currentPage.value,
        limit: 10,
      },
    })
  );
  //分页
  const handleCurrentChange = (val: number) => {
    // console.log(`current page: ${val}`);
    currentPage.value = val;
    refresh();
  };
</script>
