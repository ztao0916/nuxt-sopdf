<template>
  <header
    class="bg-sopdf-100 text-lg text-white sticky top-0 w-full z-10 h-14 leading-[3.5rem] border-box px-16"
  >
    <div class="flex">
      <div class="bg-blue-400 flex-grow">
        <div>头部左侧</div>
      </div>
      <div class="bg-red-400 w-[800px] text-center">
        <div>头部中间</div>
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
</script>

<style lang="css" scoped>
  .svg-color-white {
    color: #fff !important;
  }
</style>
