<template>
  <div class="h-full flex flex-col">
    <Header />
    <main class="flex-grow mb-5 bg-sopdf-400 flex justify-center box-border">
      <slot name="default" />
    </main>
    <Footer />
  </div>
</template>

<style lang="css" scoped>
  .flex-grow {
    flex-grow: 1;
    overflow-y: auto;
  }
</style>
