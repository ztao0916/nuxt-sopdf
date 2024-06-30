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
      <el-tabs v-model="activeName">
        <el-tab-pane label="我的收藏" name="first">
          <client-only>
            <el-table :data="collectData?.data" class="w-[800px]" size="small">
              <el-table-column prop="createTime" label="收藏时间" width="200" />
              <el-table-column
                prop="pdfName"
                label="样册名称"
                width="320"
                show-overflow-tooltip
              >
                <template #default="scope">
                  <NuxtLink
                    :to="'/detail/' + scope.row.uuid + '/1'"
                    class="text-blue-500"
                  >
                    {{ scope.row.pdfName }}
                  </NuxtLink>
                </template>
              </el-table-column>
              <el-table-column prop="fileSize" label="大小">
                <template #default="scope">
                  {{ scope.row.fileSize }}Mb
                </template>
              </el-table-column>
              <el-table-column prop="pdfPage" label="页数" />
              <el-table-column label="操作">
                <template #default="scope">
                  <div
                    class="cursor-pointer text-blue-400"
                    @click="cancelCollectHandle(scope.row.uuid)"
                  >
                    取消收藏
                  </div>
                </template>
              </el-table-column>
            </el-table>
            <div class="w-full bg-sopdf-600 py-1 px-2.5 flex justify-end">
              <el-pagination
                layout="pager, next"
                next-text="下一页"
                :hide-on-single-page="collectData?.total <= 20"
                :default-page-size="20"
                :total="collectData?.total || 0"
                v-model:current-page="collectPage"
                @current-change="handleCollectPageChange"
              />
            </div>
          </client-only>
        </el-tab-pane>
        <el-tab-pane label="我的下载" name="second">
          <client-only>
            <el-table :data="downloadData?.data" class="w-[800px]" size="small">
              <el-table-column prop="createTime" label="下载时间" width="200" />
              <el-table-column
                prop="pdfName"
                label="样册名称"
                width="320"
                show-overflow-tooltip
              >
                <template #default="scope">
                  <NuxtLink
                    :to="'/detail/' + scope.row.uuid + '/1'"
                    class="text-blue-500"
                  >
                    {{ scope.row.pdfName }}
                  </NuxtLink>
                </template>
              </el-table-column>
              <el-table-column prop="fileSize" label="大小">
                <template #default="scope">
                  {{ scope.row.fileSize }}Mb
                </template>
              </el-table-column>
              <el-table-column prop="pdfPage" label="页数" />
            </el-table>
            <div class="w-full bg-sopdf-600 py-1 px-2.5 flex justify-end">
              <el-pagination
                layout="pager, next"
                next-text="下一页"
                :hide-on-single-page="downloadData?.total <= 20"
                :default-page-size="20"
                :total="downloadData?.total || 0"
                v-model:current-page="downPage"
                @current-change="handleDownPageChange"
              />
            </div>
          </client-only>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script lang="ts" setup>
  definePageMeta({
    middleware: ["auth"],
  });
  interface Post {
    [key: string]: any;
  }
  const downPage = ref(1);
  const collectPage = ref(1);

  const collectBody = computed(() => {
    return {
      page: collectPage.value,
      limit: 20,
    };
  });
  //必须把请求参数独立出来,不知道原因
  const downloadBody = computed(() => {
    return {
      page: downPage.value,
      limit: 20,
    };
  });
  //单个请求处理-个人信息数据
  const getMyReq = useServerRequest<Post>("/user/my", {
    server: false,
  });
  //单个请求处理-收藏数据
  const getMyCollectReq = useServerRequest<Post>("/user/myCollect", {
    server: false,
    query: collectBody,
  });

  //单个请求处理-下载数据
  const getMyDownloadReq = useServerRequest<Post>("/user/myDownload", {
    server: false,
    query: downloadBody,
  });
  //获取个人信息
  const [{ data: userData }, { data: collectData }, { data: downloadData }] =
    await Promise.all([getMyReq, getMyCollectReq, getMyDownloadReq]);

  //tab配置
  //取消收藏功能
  const cancelCollectHandle = async (uuid: string) => {
    const res: any = await $useFetch("/pdf/recard/uncollect", {
      server: false,
      query: {
        uuid,
      },
    });
    if (res.code === 200) {
      getMyCollectReq.refresh();
    }
  };
  const activeName = ref("first");
  //下载分页
  const handleDownPageChange = async (page: number) => {
    console.log(page);
    downPage.value = page;
    getMyDownloadReq.refresh();
  };
  //收藏分页
  const handleCollectPageChange = async (page: number) => {
    collectPage.value = page;
    getMyCollectReq.refresh();
  };
</script>
