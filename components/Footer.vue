<!-- components/Footer.vue -->
<template>
  <footer
    class="bg-sopdf-400 border-box fixed bottom-0 w-full z-10 h-5 text-xs flex justify-center items-center"
  >
    <!-- 这里放置你的底部内容，如版权信息、联系方式等 -->
    <div class="w-[1024px] flex justify-center items-center">
      <div class="w-[520px] flex justify-between">
        <p><NuxtLink to="/about">关于</NuxtLink></p>
        <p><NuxtLink to="/connect">联系</NuxtLink></p>
        <p>SOPDF版权所有</p>
        <p>网站备案号: 苏ICP备2023016450号-1</p>
      </div>
    </div>
  </footer>
</template>

<script setup>
  // 如果需要，可以在这里导入外部依赖或声明props
</script>

<style scoped>
  /* 在这里添加组件专属的样式 */
</style>
