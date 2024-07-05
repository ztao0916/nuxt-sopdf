<template>
  <div class="box-border mx-1 my-2 w-full">
    <!-- 左侧展示图片 -->
    <div class="w-3/4 mr-[390px]">
      <div
        v-for="(item, index) in detailData?.data.images"
        :key="index"
        :id="'image' + (index + 1)"
        class="flex box-border mb-1"
      >
        <div class="h-96"></div>
      </div>
    </div>
    <!-- 右侧展示信息 -->
    <div class="fixed top-[66px] right-6 h-full z-20 w-96">
      <!-- 基本信息 -->
      <div
        class="w-full box-border bg-white flex border border-gray-400 border-solid"
      >
        <div class="pdf-info mr-2 flex-grow">
          <div v-html="detailData?.data.pdf.pdfName" class="font-bold"></div>
          <div class="text-gray-400 text-xs flex justify-between leading-8">
            <span class="mx-3 flex-1"
              >公司品牌: {{ detailData?.data.pdf.brand }}</span
            >
            <span class="flex-1"
              >文档页数: {{ detailData?.data.pdf.pdfPage }}</span
            >
          </div>
          <div class="text-gray-400 text-xs flex justify-between leading-8">
            <span class="mx-3 flex-1"
              >文档大小: {{ detailData?.data.pdf.fileSize }}Mb</span
            >
            <span class="flex-1"
              >文档版本: {{ detailData?.data.pdf.pdfVersion }}</span
            >
          </div>
          <div class="text-gray-400 text-xs flex justify-between leading-8">
            <span class="mx-3 flex-1"
              >文档格式: {{ detailData?.data.pdf.pdfFormat }}</span
            >
            <span class="flex-1"
              >产品数量: {{ detailData?.data.pdf.productNum }}</span
            >
          </div>
          <div class="text-gray-400 leading-8 text-xs flex justify-between">
            <span class="mx-3"
              >收录时间: {{ detailData?.data.pdf.createTime }}</span
            >
            <span>&nbsp;</span>
          </div>
        </div>
        <div>
          <el-image
            :src="commonUrl + detailData?.data.pdf.imageUrl"
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
          <span>浏览{{ detailData?.data.pdf.viewCount }}</span>
        </div>
        <div class="flex flex-1 text-sm cursor-pointer" @click="collectHandle">
          <SvgStar
            class="w-4"
            :class="{ 'text-sopdf-100': detailData?.data.collect }"
          />
          <span v-if="detailData?.data.collect" class="text-sopdf-100">
            已收藏{{ detailData?.data.pdf.collectCount }}
          </span>
          <span v-else> 收藏{{ detailData?.data.pdf.collectCount }} </span>
        </div>
        <div class="flex flex-1 text-sm cursor-pointer" @click="downloadHandle">
          <SvgDownload class="w-4" />
          <span>下载{{ detailData?.data.pdf.downloadCount }}</span>
        </div>
      </div>
      <!-- 选型 -->
      <div class="bg-white border border-gray-400 p-2 detail-info mb-1">
        <div v-html="detailData?.data.pdf.pdfName" class="font-bold"></div>
        <div class="page-content ml-3 flex flex-col">
          <div
            v-for="(item, index) in detailData?.data.pdfContents"
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
  interface Post {
    [key: string]: any;
  }
  //请求接口获取数据
  const { data: detailData, refresh } = await useAsyncData("detailData", () =>
    $useFetch<Post>("/pdf/detail", {
      server: false,
      query: {
        uuid: route.params.uuid,
      },
    })
  );
  //获取到环境变量
  const runtimeConfig = useRuntimeConfig();
  const commonUrl = runtimeConfig.public.commonUrl;
  //收藏事件
  const collectHandle = async () => {
    if (detailData.value?.data.collect) {
      //取消收藏
      const res: any = await $useFetch("/pdf/recard/uncollect", {
        server: false,
        query: {
          uuid: route.params.uuid,
        },
      });
      if (res.code === 200) {
        refresh();
      }
    } else {
      //收藏
      let result: any = await $useFetch("/pdf/recard/collect", {
        server: false,
        query: {
          uuid: route.params.uuid,
        },
      });
      if (result.code == 200) {
        //收藏成功
        refresh();
      }
    }
  };
  //下载事件
  const downloadHandle = async () => {
    let pdfData: any = await $useFetch(
      `/pdf/pdfdownload/${route.params.uuid}.pdf`,
      {
        server: false,
        responseType: "blob",
        headers: {
          "Content-Type": "application/pdf",
        },
      }
    );
    console.log(pdfData);
    let fileName = detailData.value?.data.pdf.pdfName;
    // 获取文件名
    let objectUrl = URL.createObjectURL(new Blob([pdfData]));
    // 文件地址
    const link = document.createElement("a");
    link.style.display = "none"; // 隐藏下载链接
    document.body.appendChild(link); // 添加到DOM以便触发点击事件
    link.download = fileName + ".pdf";
    link.href = objectUrl;
    link.click();
    // 下载后清理
    setTimeout(() => {
      URL.revokeObjectURL(objectUrl);
      link.remove(); // 移除临时创建的链接
    }, 100);
  };
  //定位
  const sopdfObj = ref({}) as any;
  const scrollHandle = (pageIndex: any) => {
    sopdfObj.value.activeId = pageIndex;
    let id = `image${pageIndex}`;
    let idPrev = `image${+pageIndex - 1}`;
    let idNext = `image${+pageIndex + 1}`;

    let targetDom: any = document.getElementById(id);
    let targetPrevDom: any = document.getElementById(idPrev);
    let targetNextDom: any = document.getElementById(idNext);
    if (targetDom !== null) {
      targetDom.classList.add("detail-bg-img");
      //设置背景图
      targetDom.style.backgroundImage = `url(${
        commonUrl + detailData.value?.data.images[+pageIndex - 1]
      })`;

      targetDom.scrollIntoView();
    }
    if (targetPrevDom !== null) {
      targetPrevDom.classList.add("detail-bg-img");
      targetPrevDom.style.backgroundImage = `url(${
        commonUrl + detailData.value?.data.images[+pageIndex - 2]
      })`;
    }
    if (targetNextDom !== null) {
      targetNextDom.classList.add("detail-bg-img");
      targetNextDom.style.backgroundImage = `url(${
        commonUrl + detailData.value?.data.images[+pageIndex]
      })`;
    }
  };
  //初始化定位-有问题,因为页面还没加载完成,怎么判断页面加载完成以后在执行这个代码呢?
  onMounted(() => {
    nextTick(async () => {
      console.log(route.params.pageIndex);
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

  .detail-bg-img {
    width: 100%; /* 设置div宽度为100% */
    background-image: url("@/assets/img/banner.jpg"); /* 引入图片路径，记得处理URL路径问题 */
    background-repeat: no-repeat; /* 图片平铺并覆盖整个div，可能会裁剪图片以适应 */
    background-position: center; /* 图片位置居中 */
    background-size: 100% 100%; /* 强制图片宽度和高度完全拉伸以适应div尺寸 */
  }
</style>
