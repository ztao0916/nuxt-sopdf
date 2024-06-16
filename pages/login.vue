<script lang="ts" setup>
  //用户协议默认选中
  const selected = ref(true);
  //切换登录状态
  const userStatus = ref("login");
  const switchStatus = (status: string) => {
    userStatus.value = status;
  };
</script>

<template>
  <div class="w-full h-full flex justify-center items-center">
    <div
      class="bg-white w-80 h-60 flex flex-col p-4 box-border justify-between border-8 border-sopdf-600"
    >
      <div class="login-title cursor-pointer">
        <span
          class="m-1.5"
          :class="{ 'font-bold': userStatus == 'login' }"
          @click="switchStatus('login')"
          >登录</span
        >
        <span>|</span>
        <span
          class="m-1.5"
          :class="{ 'font-bold': userStatus == 'register' }"
          @click="switchStatus('register')"
          >注册</span
        >
      </div>
      <div class="login-input border rounded">
        <UInput
          placeholder="请输入手机号"
          class="w-full"
          color="white"
          variant="none"
        />
      </div>
      <div class="login-input border rounded flex items-center">
        <UInput
          placeholder="请输入验证码"
          class="w-full"
          color="white"
          variant="none"
        />
        <span class="text-sopdf-600">|</span>
        <div
          class="text-sopdf-400 w-[130px] text-sm cursor-pointer px-2 box-border"
        >
          获取验证码
        </div>
      </div>
      <div class="login-agreement">
        <UCheckbox :model-value="selected" color="orange">
          <template #label>
            <span> 我已阅读并同意</span>
            <NuxtLink class="text-sopdf-100" to="/agreement">用户协议</NuxtLink>
          </template>
        </UCheckbox>
      </div>
      <div class="login-submit text-center">
        <button type="button" class="w-full bg-sopdf-100 text-white">
          {{ userStatus == "login" ? "登录" : "注册" }}
        </button>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
