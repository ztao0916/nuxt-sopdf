<template>
  <div class="default-layout">
    <header>
      <h1>头部</h1>
    </header>
    <section>
      <slot />
    </section>
    <footer>
      <h1>底部</h1>
    </footer>
  </div>
</template>

<style>
  .default-layout {
    color: red;
  }
</style>
