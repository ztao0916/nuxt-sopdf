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
          找到<span class="text-red-600">{{ totalNum }}</span
          >个结果:
        </div>
        <div class="items-container">
          <Items :items="items"></Items>
        </div>
      </div>
      <div class="w-full bg-sopdf-600 py-1 px-2.5 flex justify-end">
        <el-pagination
          layout="pager, next"
          next-text="下一页"
          :total="1000"
          v-model:current-page="currentPage"
          @current-change="handleCurrentChange"
        />
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
  import { useRoute } from "vue-router";
  const route = useRoute();
  console.log(route.params);
  //请求接口
  //获取到首页数据
  const searchData: any = await $useFetch(`/search`, {
    server: false,
    query: {
      key: route.params.key, //参数是搜索的内容
      page: 1,
    },
  });
  //定义数量
  const totalNum = ref(0);
  //定义展示的数据
  const items = ref([]) as any;
  //如果searchData.code==200,就把total赋值给totalNum
  if (searchData.code == 200) {
    totalNum.value = searchData.total;
    items.value = searchData.data;
  }
  //分页
  const currentPage = ref(1); //当前页
  const handleCurrentChange = (val: number) => {
    console.log(`current page: ${val}`);
  };
  //如果分页currentPage发生变化,就重新请求接口给items重新赋值
</script>
