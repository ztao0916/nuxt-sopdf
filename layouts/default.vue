<template>
  <div class="h-full flex flex-col">
    <Header />
    <main class="flex-grow mb-8 bg-sopdf-700 flex justify-center box-border">
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
