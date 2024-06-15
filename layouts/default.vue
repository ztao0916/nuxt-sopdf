<template>
  <div class="bg-sky-100 h-full flex flex-col">
    <Header />
    <main class="flex-grow mb-5 bg-sopdf-400">
      <slot name="default" />
    </main>
    <Footer />
  </div>
</template>

<style lang="css" scoped>
  .flex-grow {
    flex-grow: 1;
  }
</style>
