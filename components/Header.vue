<!-- components/Header.vue -->
<template>
  <header
    class="bg-gray-100 text-lg sticky top-0 w-full z-10 h-14 leading-[3.5rem]"
  >
    <!-- 这里放置你的头部内容，如logo、导航菜单等 -->
    <nav>
      <ul>
        <li><NuxtLink to="/">首页</NuxtLink></li>
      </ul>
    </nav>
  </header>
</template>

<script setup>
  // 如果需要，可以在这里导入外部依赖或声明props
</script>

<style scoped>
  /* 在这里添加组件专属的样式 */
</style>
