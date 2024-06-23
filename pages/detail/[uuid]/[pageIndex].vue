<template>
  <div class="box-border mx-1 my-2 w-full">
    <!-- 左侧展示图片 -->
    <div class="w-3/4 mr-[390px]">
      <div
        v-for="(item, index) in images"
        :key="index"
        :id="'image' + (index + 1)"
        class="flex box-border mb-1"
      >
        <el-image :src="commonUrl + item" class="w-full" lazy>
          <template #error>
            <!-- 加载assets/img/common.jpg -->
            <div>
              <img
                src="@/assets/img/common.jpg"
                alt="default-image"
                class="w-full"
              />
            </div>
          </template>
        </el-image>
      </div>
    </div>
    <!-- 右侧展示信息 -->
    <div class="fixed top-[66px] right-6 h-full z-20 w-96">
      <!-- 基本信息 -->
      <div
        class="w-full box-border bg-white flex border border-gray-400 border-solid"
      >
        <div class="pdf-info mr-2 flex-grow">
          <div v-html="pdfInfo.pdfName" class="font-bold"></div>
          <div class="text-gray-400 text-xs flex justify-between leading-8">
            <span class="mx-3 flex-1">公司品牌: {{ pdfInfo.brand }}</span>
            <span class="flex-1">文档页数: {{ pdfInfo.pdfPage }}</span>
          </div>
          <div class="text-gray-400 text-xs flex justify-between leading-8">
            <span class="mx-3 flex-1">文档大小: {{ pdfInfo.fileSize }}Mb</span>
            <span class="flex-1">文档版本: {{ pdfInfo.pdfVersion }}</span>
          </div>
          <div class="text-gray-400 text-xs flex justify-between leading-8">
            <span class="mx-3 flex-1">文档格式: {{ pdfInfo.pdfFormat }}</span>
            <span class="flex-1">产品数量: {{ pdfInfo.productNum }}</span>
          </div>
          <div class="text-gray-400 leading-8 text-xs flex justify-between">
            <span class="mx-3">收录时间: {{ pdfInfo.createTime }}</span>
            <span>&nbsp;</span>
          </div>
        </div>
        <div>
          <el-image
            :src="commonUrl + pdfInfo.imageUrl"
            class="w-[120px] h-[172px]"
            lazy
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
      </div>
      <!-- 操作 -->
      <div class="flex justify-between leading-6 text-gray-400 my-2">
        <div class="flex flex-1 text-sm">
          <SvgView class="w-4" />
          <span>浏览{{ pdfInfo.viewCount }}</span>
        </div>
        <div class="flex flex-1 text-sm cursor-pointer" @click="collectHandle">
          <SvgStar class="w-4" />
          <span>收藏{{ pdfInfo.collectCount }}</span>
        </div>
        <div class="flex flex-1 text-sm cursor-pointer">
          <SvgDownload class="w-4" />
          <span>下载{{ pdfInfo.downloadCount }}</span>
        </div>
      </div>
      <!-- 选型 -->
      <div class="bg-white border border-gray-400 p-2 detail-info mb-1">
        <div v-html="pdfInfo.pdfName" class="font-bold"></div>
        <div class="page-content ml-3 flex flex-col">
          <div
            v-for="(item, index) in pdfContents"
            :key="item.id"
            class="content-item text-sm"
            :class="{ 'active-item': sopdfObj.activeId == item.pageIndex }"
            @click="scrollHandle(item.pageIndex)"
          >
            {{ "P" + item.pageIndex + "  " + item.name }}
          </div>
        </div>
      </div>
      <!-- 广告位 -->
      <div class="w-full h-20 ads-img"></div>
    </div>
  </div>
</template>
<script lang="ts" setup>
  import { useRoute } from "vue-router";
  const route = useRoute();
  //定义渲染的数据图片
  const images = ref([]);
  //定义渲染的数据内容页
  const pdfContents = ref([]) as any;
  //定义渲染的pdf信息
  const pdfInfo = ref({}) as any;
  //请求接口获取数据
  const detailData: any = await $useFetch("/pdf/detail", {
    server: false,
    query: {
      uuid: route.params.uuid,
    },
  });
  images.value = detailData.data.images;
  pdfContents.value = detailData.data.pdfContents;
  pdfInfo.value = detailData.data.pdf;
  //获取到环境变量
  const runtimeConfig = useRuntimeConfig();
  const commonUrl = runtimeConfig.public.commonUrl;
  //收藏事件
  const collectHandle = async () => {
    let result: any = await $useFetch("/pdf/recard/collect", {
      server: false,
      query: {
        uuid: route.params.uuid,
      },
    });
    console.log(result);
  };
  //定位
  const sopdfObj = ref({}) as any;
  const scrollHandle = (pageIndex: any) => {
    sopdfObj.value.activeId = pageIndex;
    let id = `image${pageIndex}`;
    let targetDom: HTMLElement | null = document.getElementById(id);
    if (targetDom !== null) {
      targetDom.scrollIntoView();
    }
  };
  //初始化定位-有问题,因为页面还没加载完成,怎么判断页面加载完成以后在执行这个代码呢?
  onMounted(() => {
    nextTick(async () => {
      await scrollHandle(route.params.pageIndex);
    });
  });
</script>

<style lang="css" scoped>
  .detail-info {
    height: calc(100vh - 390px);
    overflow-y: auto;
  }
  .ads-img {
    width: 100%; /* 设置div宽度为100% */
    background-image: url("@/assets/img/banner.jpg"); /* 引入图片路径，记得处理URL路径问题 */
    background-repeat: no-repeat; /* 图片平铺并覆盖整个div，可能会裁剪图片以适应 */
    background-position: center; /* 图片位置居中 */
    background-size: 100% 100%; /* 强制图片宽度和高度完全拉伸以适应div尺寸 */
  }
  .content-item {
    height: 26px;
    margin-bottom: 3px;
    box-sizing: border-box;
    border: 1px solid #ccc;
    background-color: #fff;
    line-height: 26px;
    text-align: left;
    padding-left: 5px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    cursor: pointer;
  }
  .active-item {
    background-color: #ffc000 !important;
    color: #fff;
  }
</style>
