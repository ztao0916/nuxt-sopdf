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
  <div class="mx-6 mb-4 bg-sopdf-700 w-[800px]">
    <div class="flex flex-col items-center">
      <!-- banner图 -->
      <div class="w-full my-4 banner-img h-20"></div>
      <!-- 数量展示 -->
      <div class="w-full flex justify-between text-sopdf-400 text-xs mb-4">
        <div>
          本站已收录<span class="text-sopdf-100">{{
            lastReleaseData?.total
          }}</span
          >份工业PDF样册
        </div>
        <div>
          如需收录，请将PDF样册发送至
          <span class="text-sopdf-100">sopdfservice@163.com</span>
        </div>
      </div>
      <div class="w-full bg-sopdf-600 h-full py-3 px-8">
        <div class="my-4">最新收录</div>
        <div class="items-container">
          <Items :items="lastReleaseData?.data" v-if="lastReleaseData"></Items>
        </div>
      </div>
      <div
        class="w-full bg-sopdf-600 py-1 px-2.5 flex justify-end text-xs dashboard-pagination"
      >
        <el-pagination
          layout="pager, next"
          next-text="下一页"
          size="small"
          :default-page-size="10"
          :total="lastReleaseData?.total || 0"
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
  const currentPage = ref(1); //当前页
  const queryBody = computed(() => {
    return {
      page: currentPage.value,
      limit: 10,
    };
  });
  //获取到首页数据
  const { data: lastReleaseData, refresh } = await useServerRequest<Post>(
    "/lastRelease",
    {
      server: false,
      query: queryBody,
    }
  );
  //分页
  const handleCurrentChange = async (val: number) => {
    currentPage.value = val;
    refresh();
  };
</script>
<style lang="css" scoped>
  .banner-img {
    width: 100%; /* 设置div宽度为100% */
    background-image: url("@/assets/img/ban.jpg"); /* 引入图片路径，记得处理URL路径问题 */
    background-repeat: no-repeat; /* 图片平铺并覆盖整个div，可能会裁剪图片以适应 */
    background-position: center; /* 图片位置居中 */
    background-size: 100% 100%; /* 强制图片宽度和高度完全拉伸以适应div尺寸 */
  }
  .dashboard-pagination :deep(.el-pagination) {
    --el-pagination-bg-color: none;
  }
  .dashboard-pagination :deep(.el-pagination .btn-next.is-last) {
    background-color: #f2f2f2;
    color: rgb(35, 35, 35);
  }
</style>
