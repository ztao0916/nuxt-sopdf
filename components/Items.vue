<script lang="ts" setup>
  //定义从父组件接收的数据
  const props = defineProps({
    //接收父组件传递过来的数据
    items: {
      type: Array,
      default: () => [],
    },
  });
  const data = ref(props.items) as any;

  //获取到环境变量
  const runtimeConfig = useRuntimeConfig();
  const commonUrl = runtimeConfig.public.commonUrl;
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

<template>
  <!-- 遍历items,左右布局,左边为图片,右边为具体信息 -->
  <div
    v-for="(item, outerIndex) in data"
    :key="item.id"
    class="flex box-border mb-2.5"
  >
    <!-- 左边图片 -->
    <div class="item-img mr-1.5">
      <el-image :src="commonUrl + item.imageUrl" class="w-[120px] h-[172px]">
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
      <div class="font-bold two-line-ellipsis" v-html="item.pdfName"></div>
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
          v-for="(content, index) in showContent(item.pdfContents, outerIndex)"
          :key="index"
          class="text-xs two-line-ellipsis"
        >
          <NuxtLink
            class="text-blue-500 leading-5 border-b border-blue-500"
            :to="/detail/ + item.uuid + '/' + content.pageIndex"
          >
            <span class="mr-1.5">第{{ content.pageIndex }}页</span>
            <span v-html="content.name"></span>
          </NuxtLink>
        </div>
        <!-- 如果当前item有超过限制的pdfContents，则显示省略号和按钮 -->
        <div v-if="showExpandBtn(item.pdfContents, outerIndex)" class="flex">
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
</template>

<style lang="css" scoped>
  .two-line-ellipsis {
    display: -webkit-box; /* 对于WebKit内核 */
    -webkit-line-clamp: 2; /* 显示的行数 */
    -webkit-box-orient: vertical; /* 设置或检索伸缩盒对象的子元素的排列方式 */
    overflow: hidden; /* 隐藏超出的内容 */
    text-overflow: ellipsis; /* 超出部分显示省略号 */
  }
</style>
