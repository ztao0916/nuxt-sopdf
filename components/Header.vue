<template>
  <header
    class="bg-sopdf-100 text-lg text-white sticky top-0 w-full z-10 h-14 leading-[3.5rem] border-box px-16"
  >
    <div class="flex items-center">
      <div class="flex-grow">
        <div>头部左侧</div>
      </div>
      <div class="w-[800px] flex justify-center">
        <div
          class="header-search w-[550px] h-8 leading-8 bg-white flex box-border items-center rounded-2xl justify-between"
        >
          <input
            placeholder="输入品牌、公司名称、产品名称、产品型号..."
            class="outline-0 pl-4 rounded-2xl text-black flex-grow"
            v-model="searchContent"
          />
          <button
            type="button"
            class="bg-sopdf-100 w-20 m-1 rounded-2xl search-btn"
          >
            搜索
          </button>
        </div>
      </div>
      <div class="flex-grow text-right">
        <NuxtLink to="/login" class="flex justify-end items-center">
          <div class="mr-1">登录/注册</div>
          <user-avatar class="text-[30px]" />
        </NuxtLink>
      </div>
    </div>
  </header>
</template>

<script setup>
  // 如果需要，可以在这里导入外部依赖或声明props
  const searchContent = ref("123123");
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
</style>
