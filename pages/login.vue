<script lang="ts" setup>
  //用户协议默认选中
  const selected = ref(true);
  //切换登录状态
  const userStatus = ref("login");
  const switchStatus = (status: string) => {
    userStatus.value = status;
  };
  //是否展示时间
  const showTime = ref(false);
  const startTime = ref(30); //倒计时30s
  //倒计时,需要清除定时器
  const countDown = () => {
    let timer = setInterval(() => {
      startTime.value--;
      if (startTime.value == 0) {
        clearInterval(timer);
        showTime.value = false;
        startTime.value = 30;
      }
    }, 1000);
  };
  //发送验证码
  const phoneNum = ref("");
  const code = ref("");
  const sendCodeHandle = () => {
    //如果没有手机号码,不允许发送,并提醒
    if (!phoneNum.value) {
      ElMessage({
        message: "请输入手机号!",
        type: "error",
      });
      return;
    }
    countDown();
    showTime.value = true;
  };
</script>

<template>
  <div class="w-full h-full flex justify-center items-center">
    <div
      class="bg-white w-80 h-60 flex flex-col p-4 box-border justify-between border-8 border-sopdf-600"
    >
      <div class="login-title cursor-pointer">
        <span
          class="pr-2"
          :class="{ 'font-bold': userStatus == 'login' }"
          @click="switchStatus('login')"
          >登录</span
        >
        <span
          class="border-l-[1px] box-border pl-2"
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
          v-model="phoneNum"
        />
      </div>
      <div class="login-input border rounded flex items-center">
        <UInput
          placeholder="请输入验证码"
          class="w-full"
          color="white"
          variant="none"
          v-model="code"
        />
        <div
          class="text-sopdf-400 w-[130px] text-sm cursor-pointer px-2 box-border border-l-[1px] pl-2"
          v-if="!showTime"
          @click="sendCodeHandle"
        >
          获取验证码
        </div>
        <div
          v-else
          class="text-sopdf-400 w-[130px] text-sm px-2 box-border text-center cursor-not-allowed border-l-[1px] pl-2"
        >
          {{ startTime }} 秒
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
