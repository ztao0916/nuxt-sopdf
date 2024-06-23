<template>
  <header
    class="bg-sopdf-100 text-lg text-white sticky top-0 w-full z-10 h-14 leading-[3.5rem] border-box px-16"
  >
    <div class="flex items-center">
      <div class="flex-grow header-log">
        <NuxtLink to="/" class="flex items-center">
          <div class="flex h-12 items-center">
            <div class="w-[100px] h-12 logo-background"></div>
            <div
              class="text-xs h-8 border-l-[1px] box-border pl-2 border-white"
            >
              <p>工业产品内容搜索</p>
              <p>手册/样本/样册/型录/Catalog/Datasheet</p>
            </div>
          </div>
        </NuxtLink>
      </div>
      <div class="w-[800px] flex">
        <div
          class="header-search w-[550px] h-8 leading-8 bg-white flex box-border items-center rounded-2xl justify-between"
        >
          <input
            placeholder="请输入产品名称,品牌或者公司名"
            class="outline-0 pl-4 rounded-2xl text-black flex-grow"
            v-model="searchContent"
          />
          <button
            type="button"
            class="bg-sopdf-100 w-20 m-1 rounded-2xl search-btn"
            @click="searchHandle()"
          >
            搜索
          </button>
        </div>
      </div>
      <div class="flex-grow text-right">
        <NuxtLink
          to="/login"
          class="flex justify-end items-center"
          v-if="!satoken"
        >
          <div class="mr-1">登录/注册</div>
          <SvgUserAvatar class="text-[30px]" />
        </NuxtLink>
        <div v-else class="flex justify-end items-center">
          <el-dropdown trigger="click" @command="handleCommand">
            <div class="el-dropdown-link flex leading-8 text-white">
              <span>{{ phone }}</span>
              <SvgCaretBottom class="w-4 text-white mt-2.5"></SvgCaretBottom>
              <SvgUserAvatar class="text-[30px]" />
            </div>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item command="profile">个人中心</el-dropdown-item>
                <el-dropdown-item command="logout">退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
  // 如果需要，可以在这里导入外部依赖或声明props
  const searchContent = ref("");
  //searchContent如果是空,就提示搜索关键词不能为空
  const searchHandle = async () => {
    if (searchContent.value === "") {
      ElMessage({
        message: "搜索关键词不能为空",
        type: "error",
      });
    } else {
      // 跳转到搜索结果页面,使用vue3语法
      await navigateTo(`/search/${searchContent.value}`);
    }
  };
  //获取到是否有cookie
  const satoken = useCookie("satoken");
  const phone = useCookie("phone");
  // @command="handleCommand"
  const handleCommand = (command) => {
    console.log(command);
    switch (command) {
      case "logout":
        logOut();
        break;
      case "profile":
        navigateTo("/profile");
        break;
    }
  };
  const logOut = () => {
    satoken.value = "";
    phone.value = "";
    ElMessage({
      message: "退出成功",
      type: "success",
    });
  };
</script>

<style lang="css" scoped>
  .svg-color-white {
    color: #fff !important;
  }
  .search-btn {
    width: 69px;
    height: 26px;
    line-height: 26px;
    border-radius: 0px 16px 16px 0px;
  }
  .logo-background {
    width: 100px; /* 设置div宽度为100px */
    background-image: url("@/assets/img/logo.jpg"); /* 引入图片路径，记得处理URL路径问题 */
    background-repeat: no-repeat; /* 图片平铺并覆盖整个div，可能会裁剪图片以适应 */
    background-position: center; /* 图片位置居中 */
    background-size: 100% 100%; /* 强制图片宽度和高度完全拉伸以适应div尺寸 */
  }
</style>
