<template>
  <div class="profile w-[800px] box-border">
    <!-- 个人信息 -->
    <div class="profile-user bg-sopdf-600 my-3 p-2 text-sm">
      <div class="flex justify-items-start leading-6">
        <span class="flex-1">UID: {{ userData?.data.uid }}</span>
        <span class="flex-1">手机号: {{ userData?.data.phone }}</span>
      </div>
      <div class="flex justify-items-start">
        <span class="flex-1">注册时间: {{ userData?.data.createTime }}</span>
        <span class="flex-1">收藏: {{ collectData?.total }}</span>
        <span class="flex-1">下载: {{ downloadData?.total }}</span>
      </div>
    </div>
    <!-- 使用记录 -->
    <div class="profile-record bg-sopdf-600 p-2">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="我的收藏" name="first">我的收藏</el-tab-pane>
        <el-tab-pane label="我的下载" name="second">我的下载</el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script lang="ts" setup>
  import type { TabsPaneContext } from "element-plus";
  definePageMeta({
    middleware: ["auth"],
  });
  interface Post {
    [key: string]: any;
  }
  //单个请求处理-个人信息数据
  const getMyReq = useServerRequest<Post>("/user/my", {
    server: false,
  });
  //单个请求处理-收藏数据
  const getMyCollectReq = useServerRequest<Post>("/user/myCollect", {
    server: false,
  });
  //单个请求处理-下载数据
  const getMyDownloadReq = useServerRequest<Post>("/user/myDownload", {
    server: false,
  });
  //获取个人信息
  const [{ data: userData }, { data: collectData }, { data: downloadData }] =
    await Promise.all([getMyReq, getMyCollectReq, getMyDownloadReq]);

  //tab配置
  const activeName = ref("first");
  const handleClick = (tab: TabsPaneContext, event: Event) => {
    console.log(tab);
  };
</script>
