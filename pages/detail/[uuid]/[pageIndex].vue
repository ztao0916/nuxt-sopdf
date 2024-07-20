<template>
  <div class="box-border mx-1 my-2 w-full h-full">
    <!-- 左侧展示图片 -->
    <div class="w-3/4 mr-[390px]">
      <div
        v-for="(item, index) in detailData?.data.images"
        :key="index"
        :id="'image' + (index + 1)"
        class="flex box-border mb-1"
      >
        <div class="h-[666px] w-full">
          <el-image
            class="w-full h-auto"
            :src="commonUrl + getSrc(index)"
            fit="fill"
          >
            <template #placeholder>
              <div class="image-slot">Loading<span class="dot">...</span></div>
            </template>
          </el-image>
        </div>
      </div>
    </div>
    <!-- 右侧展示信息 -->
    <div class="fixed top-[66px] right-6 h-full z-20 w-96">
      <!-- 基本信息 -->
      <div
        class="w-full box-border bg-white flex border-sopdf-400 border-solid border"
      >
        <client-only>
          <table class="info-table text-xs text-sopdf-400 flex-1">
            <tr>
              <td rowspan="3" colspan="4">
                <div
                  v-html="detailData?.data.pdf.pdfName"
                  class="font-bold text-sopdf-500 multi-line-ellipsis"
                ></div>
              </td>
            </tr>
            <tr></tr>
            <tr></tr>
            <tr>
              <td>公司品牌:</td>
              <td>{{ detailData?.data.pdf.brand }}</td>
              <td>文档页数:</td>
              <td>{{ detailData?.data.pdf.pdfPage }}</td>
            </tr>
            <tr>
              <td>文档大小:</td>
              <td>{{ detailData?.data.pdf.fileSize }}Mb</td>
              <td>文档版本:</td>
              <td>{{ detailData?.data.pdf.pdfVersion }}</td>
            </tr>
            <tr>
              <td>文档格式:</td>
              <td>{{ detailData?.data.pdf.pdfFormat }}</td>
              <td>产品数量:</td>
              <td>{{ detailData?.data.pdf.productNum }}</td>
            </tr>
            <tr>
              <td>收录时间:</td>
              <td colspan="3">{{ detailData?.data.pdf.createTime }}</td>
            </tr>
          </table>
        </client-only>
        <div class="w-[120px] h-[172px]">
          <el-image
            :src="commonUrl + detailData?.data.pdf.imageUrl"
            class="w-full h-full"
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
        <div
          class="flex flex-1 text-sm cursor-pointer"
          v-loading.fullscreen.lock="fullscreenLoading"
          @click="downloadHandle"
        >
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
            :class="{
              'active-item':
                sopdfObj.activeId == item.pageIndex &&
                sopdfObj.itemId == item.id,
            }"
            @click="clickToLocateHandle(item.pageIndex, item.id)"
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
  const fullscreenLoading = ref(false);
  const downloadHandle = async () => {
    fullscreenLoading.value = true;
    try {
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
      fullscreenLoading.value = false;
      // 下载后清理
      setTimeout(() => {
        URL.revokeObjectURL(objectUrl);
        link.remove(); // 移除临时创建的链接
      }, 100);
    } catch (err) {
      console.log("下载失败", err);
      fullscreenLoading.value = false;
    }
  };
  // 滚动和定位
  const loadedImages = ref<number[]>([]);
  const scrollableArea = ref<any>(null);

  //检查图片是否已加载
  const isLoaded = (index: any) => {
    return loadedImages.value.includes(index);
  };

  //获取图片的src,只有当图片加载的时候才返回真实的src
  const getSrc = (index: any) =>
    isLoaded(index) ? detailData.value?.data.images[index] : "";
  const mainElement = import.meta.client && document.querySelector("main");
  const handleScroll = () => {
    if (mainElement) {
      const { scrollTop, clientHeight } = scrollableArea.value;
      const images = detailData.value?.data.images;
      const imageHeights = images.map(() => 666); //每张图片高666px
      images.forEach((_: any, index: any) => {
        const top = imageHeights
          .slice(0, index)
          .reduce((acc: any, curr: any) => acc + curr, 0);
        const bottom = top + imageHeights[index];
        if (scrollTop + clientHeight >= top && scrollTop < bottom) {
          if (!isLoaded(index)) {
            loadedImages.value.push(index);
            getSrc(index);
          }
        }
      });
    }
  };
  //点击定位功能
  const sopdfObj = ref({}) as any;
  const clickToLocateHandle = (pageIndex: any, itemId: any) => {
    sopdfObj.value.activeId = pageIndex;
    sopdfObj.value.itemId = itemId;
    let id = `image${pageIndex}`;
    let targetDom: any = document.getElementById(id);
    if (targetDom !== null) {
      targetDom.scrollIntoView();
      //加载附近的背景图,如果在 loadedImages.value 不存在,就push进去
      //当前图
      if (!loadedImages.value.includes(+pageIndex - 1)) {
        loadedImages.value.push(+pageIndex - 1);
        getSrc(+pageIndex - 1);
      }
      //后两张
      if (
        +pageIndex + 1 <= detailData.value?.data.images.length &&
        !loadedImages.value.includes(+pageIndex + 1)
      ) {
        loadedImages.value.push(+pageIndex + 1);
        getSrc(+pageIndex + 1);
      }
      //后一张
      if (!loadedImages.value.includes(+pageIndex)) {
        loadedImages.value.push(+pageIndex);
        getSrc(+pageIndex);
      }
      //前一张
      if (+pageIndex - 2 >= 0 && !loadedImages.value.includes(+pageIndex - 2)) {
        loadedImages.value.push(+pageIndex - 2);
        getSrc(+pageIndex - 2);
      }
      //前两张
      if (+pageIndex - 3 >= 0 && !loadedImages.value.includes(+pageIndex - 3)) {
        loadedImages.value.push(+pageIndex - 3);
        getSrc(+pageIndex - 3);
      }
    }
  };
  //初始化定位
  onMounted(() => {
    let pageIndex = +((route.params.pageIndex as string) || "").split("-")[0];
    let currentId = +((route.params.pageIndex as string) || "").split("-")[1];
    //给loadedImages赋值,为route.params.pageIndex-1,如果大于2,就route.params.pageIndex-2,
    loadedImages.value = [pageIndex - 1];
    if (pageIndex >= 2) {
      loadedImages.value.unshift(pageIndex - 2);
    }
    if (pageIndex >= 3) {
      loadedImages.value.unshift(pageIndex - 3);
    }
    loadedImages.value.push(pageIndex);
    //不能超过detailData.value?.data.images.length
    if (pageIndex + 1 <= detailData.value?.data.images.length) {
      loadedImages.value.push(pageIndex + 1);
    }
    getSrc(pageIndex);
    getSrc(pageIndex - 1);
    if (pageIndex + 1 <= detailData.value?.data.images.length) {
      getSrc(pageIndex + 1);
    }
    if (pageIndex >= 2) {
      getSrc(pageIndex - 2);
    }
    if (pageIndex >= 3) {
      getSrc(pageIndex - 3);
    }

    clickToLocateHandle(pageIndex, currentId);

    if (mainElement) {
      scrollableArea.value = mainElement;
      mainElement.addEventListener("scroll", handleScroll);
    }
  });
  onUnmounted(() => {
    if (mainElement) {
      mainElement.removeEventListener("scroll", handleScroll);
    }
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
  .info-table {
    width: 100%;
    border-collapse: collapse; /* 确保边框不会重叠 */
    border-spacing: 0; /* 消除单元格之间的间距 */
  }

  .info-table td {
    border: 1px solid #ddd; /* 单元格的边框 */
    padding: 1px;
  }
  .info-table tr:first-child td {
    border-top: none;
  }
  .info-table tr:last-child td {
    border-bottom: none;
  }
  .info-table td:first-child {
    border-left: none;
  }
  .multi-line-ellipsis {
    display: -webkit-box;
    -webkit-line-clamp: 3; /* 显示的行数 */
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
</style>
