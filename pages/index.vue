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
          <!-- 遍历items,左右布局,左边为图片,右边为具体信息 -->
          <div
            v-for="(item, outerIndex) in items"
            :key="item.id"
            class="flex box-border mb-2.5"
          >
            <!-- 左边图片 -->
            <div class="item-img mr-1.5">
              <el-image
                :src="commonUrl + item.imageUrl"
                class="w-[120px] h-[172px]"
              >
                <template #error>
                  <!-- 加载assets/img/common.jpg -->
                  <div>
                    <img
                      src="@/assets/img/common.jpg"
                      alt="default-image"
                      class="w-[120px] h-[172px]"
                    />
                  </div>
                </template>
              </el-image>
            </div>
            <!-- 右边具体信息 -->
            <div class="item-info">
              <!-- 标题 -->
              <div class="font-bold two-line-ellipsis">{{ item.pdfName }}</div>
              <!-- 产品信息 -->
              <div class="ml-1.5 text-xs two-line-ellipsis text-[#d9d9d9]">
                <span class="mr-3">公司品牌: {{ item.brand }};</span>
                <span class="mr-3">文档页数: {{ item.pdfPage }};</span>
                <span class="mr-3">文档大小: {{ item.fileSize }}M;</span>
                <span class="mr-3">文档版本: {{ item.pdfVersion }};</span>
                <span class="mr-3">文档格式: {{ item.pdfFormat }};</span>
                <span class="mr-3">产品数量: {{ item.productNum }};</span>
                <span>收录时间: {{ item.createTime }}</span>
              </div>
              <!-- 详细内容 -->
              <div class="ml-1.5 content-container">
                <!-- 遍历item.pdfContents -->
                <div
                  v-for="(content, index) in showContent(
                    item.pdfContents,
                    outerIndex
                  )"
                  :key="index"
                  class="text-xs two-line-ellipsis"
                >
                  <NuxtLink
                    class="text-blue-500 leading-5 border-b border-blue-500"
                    :to="/detail/ + item.uuid"
                  >
                    <span class="mr-1.5">第{{ content.pageIndex }}页</span>
                    <span v-html="content.name"></span>
                  </NuxtLink>
                </div>
                <!-- 如果当前item有超过限制的pdfContents，则显示省略号和按钮 -->
                <div
                  v-if="showExpandBtn(item.pdfContents, outerIndex)"
                  class="flex"
                >
                  <span class="flex-1">...</span>
                  <div class="flex-1">
                    <div class="w-16">
                      <el-button
                        @click="toggleExpand(outerIndex)"
                        link
                        type="primary"
                        size="small"
                      >
                        展开更多
                        <SvgCaretBottom />
                      </el-button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="w-full bg-sopdf-600 py-1 px-2.5">分页</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  //获取到环境变量
  const runtimeConfig = useRuntimeConfig();
  const commonUrl = runtimeConfig.public.commonUrl;
  //获取到首页数据
  const lastReleaseData: any = await $useFetch(`/lastRelease`, {
    server: false,
    query: {
      page: 1,
    },
  });
  //定义数量
  const totalNum = ref(0);
  //定义展示的数据
  const items = ref([]) as any;
  //如果lastReleaseData.code==200,就把total赋值给totalNum
  if (lastReleaseData.code == 200) {
    totalNum.value = lastReleaseData.total;
    items.value = lastReleaseData.data;
  }
  //定义展开状态的索引
  const expandIndexArr = ref([]) as any;
  //定义函数,限制item.pdfcontents的长度不超过10
  const showContent = (contents: any, index: any) => {
    const limit = 10; // 每个item的显示限制
    if (expandIndexArr.value.includes(index)) {
      return contents;
    }
    return contents.slice(0, limit);
  };
  //判断是否应该显示展开按钮
  const showExpandBtn = (contents: any, index: any) => {
    const limit = 10;
    return contents.length > limit && !expandIndexArr.value.includes(index);
  };
  //点击展开更多显示超过10的数据
  const toggleExpand = (index: any) => {
    if (expandIndexArr.value.includes(index)) {
      expandIndexArr.value = expandIndexArr.value.filter(
        (i: any) => i !== index
      );
    } else {
      expandIndexArr.value.push(index);
    }
  };
</script>
<style lang="css" scoped>
  .banner-img {
    width: 100%; /* 设置div宽度为100% */
    background-image: url("@/assets/img/banner.jpg"); /* 引入图片路径，记得处理URL路径问题 */
    background-repeat: no-repeat; /* 图片平铺并覆盖整个div，可能会裁剪图片以适应 */
    background-position: center; /* 图片位置居中 */
    background-size: 100% 100%; /* 强制图片宽度和高度完全拉伸以适应div尺寸 */
  }
  .two-line-ellipsis {
    display: -webkit-box; /* 对于WebKit内核 */
    -webkit-line-clamp: 2; /* 显示的行数 */
    -webkit-box-orient: vertical; /* 设置或检索伸缩盒对象的子元素的排列方式 */
    overflow: hidden; /* 隐藏超出的内容 */
    text-overflow: ellipsis; /* 超出部分显示省略号 */
  }
</style>
