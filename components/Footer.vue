<template>
  <footer
    class="bg-sopdf-700 border-box fixed bottom-0 w-full z-10 h-8 text-xs flex justify-center items-center"
  >
    <!-- 这里放置你的底部内容，如版权信息、联系方式等 -->
    <div class="w-[800px] flex justify-center items-center">
      <div class="w-[400px] flex justify-between">
        <p><NuxtLink to="/about">关于</NuxtLink></p>
        <p><NuxtLink to="/connect">联系</NuxtLink></p>
        <p>SOPDF版权所有</p>
        <p>网站备案号: 苏ICP备2024105340号-1</p>
      </div>
    </div>
  </footer>
</template>
