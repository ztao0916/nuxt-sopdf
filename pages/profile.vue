<template>
  <div class="profile w-[800px] box-border">
    <!-- 个人信息 -->
    <div class="profile-user bg-sopdf-600 my-3 p-2 text-sm">
      <div class="flex justify-items-start leading-6">
        <span class="flex-1">UID: {{ userData.uid }}</span>
        <span class="flex-1">手机号: {{ userData.phone }}</span>
      </div>
      <div class="flex justify-items-start">
        <span class="flex-1">注册时间: {{ userData.createTime }}</span>
        <span class="flex-1">收藏: {{ collectData.total }}</span>
        <span class="flex-1">下载: {{ downloadData.total }}</span>
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

  //获取个人信息
  const allData: any = await Promise.all([
    $useFetch("/user/my", {
      server: false,
    }),
    $useFetch("/user/myCollect", {
      server: false,
      query: {
        page: 1,
      },
    }),
    $useFetch("/user/myDownload", {
      server: false,
      query: {
        page: 1,
      },
    }),
  ]);
  console.log(allData);
  //个人信息数据
  const userData = ref({}) as any;
  userData.value = allData[0].data;
  //收藏数据
  const collectData = ref({}) as any;
  collectData.value = allData[1];
  //下载数据
  const downloadData = ref({}) as any;
  downloadData.value = allData[2];
  //tab配置
  const activeName = ref("first");
  const handleClick = (tab: TabsPaneContext, event: Event) => {
    console.log(tab, event);
  };
</script>
