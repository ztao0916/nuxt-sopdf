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
      <div class="w-full my-2 banner-img h-20"></div>
      <!-- 数量展示 -->
      <div class="w-full flex justify-between text-sopdf-400 text-xs mb-2">
        <div>
          本站已收录<span class="text-sopdf-100">{{ totalNum }}</span
          >份工业PDF样册
        </div>
        <div>
          如需收录，请将PDF样册发送至
          <span class="text-sopdf-100">sopdfservice@163.com</span>
        </div>
      </div>
      <div class="w-full bg-sopdf-600 h-full py-1 px-2.5">
        <div>最新收录</div>
        <div class="items-container">
          <Items :items="items"></Items>
        </div>
      </div>
      <div class="w-full bg-sopdf-600 py-1 px-2.5 flex justify-end">
        <el-pagination
          layout="pager, next"
          next-text="下一页"
          :total="totalNum"
          v-model:current-page="currentPage"
          @current-change="handleCurrentChange"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  const currentPage = ref(1) as any; //当前页
  //获取到首页数据
  const lastReleaseData: any = await $useFetch(`/lastRelease`, {
    server: false,
    query: {
      page: 1,
      // limit: 2,
    },
  });
  // console.log("lastReleaseData", lastReleaseData);
  //定义数量
  const totalNum = ref(0);
  //定义展示的数据
  const items = ref([]) as any;
  totalNum.value = lastReleaseData.total;
  items.value = lastReleaseData.data;
  //分页
  const handleCurrentChange = async (val: number) => {
    console.log(`current page: ${val}`);
    currentPage.value = val;
    const currentData: any = await $useFetch(`/lastRelease`, {
      server: false,
      query: {
        page: val,
        // limit: 2,
      },
    });
    items.value = currentData.data;
  };
  //监听items变化
  watch(currentPage, () => {
    console.log(currentPage.value);
  });
</script>
<style lang="css" scoped>
  .banner-img {
    width: 100%; /* 设置div宽度为100% */
    background-image: url("@/assets/img/banner.jpg"); /* 引入图片路径，记得处理URL路径问题 */
    background-repeat: no-repeat; /* 图片平铺并覆盖整个div，可能会裁剪图片以适应 */
    background-position: center; /* 图片位置居中 */
    background-size: 100% 100%; /* 强制图片宽度和高度完全拉伸以适应div尺寸 */
  }
</style>
