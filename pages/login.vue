<script lang="ts" setup>
  const selected = ref(true);
</script>

<template>
  <div class="w-full h-full flex justify-center items-center">
    <div
      class="bg-white w-80 h-60 flex flex-col p-4 box-border justify-between"
    >
      <div class="login-title">
        <span>登录</span>
        <span>|</span>
        <span>注册</span>
      </div>
      <div class="login-input border rounded-sm">
        <UInput
          placeholder="请输入手机号"
          class="w-full"
          color="white"
          variant="none"
        />
      </div>
      <div class="login-input border rounded-sm">
        <UInput
          placeholder="请输入验证码"
          class="w-full"
          color="white"
          variant="none"
        />
      </div>
      <div class="login-agreement">
        <UCheckbox :model-value="selected" color="orange">
          <template #label>
            <span> 我已阅读并同意</span>
            <NuxtLink class="text-sopdf-100" to="/agreement">用户协议</NuxtLink>
          </template>
        </UCheckbox>
      </div>
      <div class="login-submit">登录/注册</div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
