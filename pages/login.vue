<script lang="ts" setup>
  definePageMeta({
    middleware: [
      () => {
        if (useCookie<string | undefined>("satoken").value) {
          return navigateTo("/");
        }
      },
    ],
  });
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
  const token: any = useToken();
  const phoneState = usePhoneState();
  const sendCodeHandle = async () => {
    //如果没有手机号码,不允许发送,并提醒
    if (!phoneNum.value) {
      ElMessage({
        message: "请输入手机号!",
        type: "error",
      });
      return;
    }
    showTime.value = true;
    await $useFetch("/user/verificationCode", {
      server: false,
      query: {
        phone: phoneNum.value,
      },
    });
    ElMessage({
      message: "验证码已发送!",
      type: "success",
    });
    countDown();
  };
  //登录
  const phoneCookie = useCookie<string | undefined>("phone");
  const loginHandle = async () => {
    if (!import.meta.client) return;
    if (!code.value) {
      ElMessage({
        message: "请输入验证码!",
        type: "error",
      });
    } else {
      const res: any = await $useFetch("/user/login", {
        server: false,
        query: {
          phone: phoneNum.value,
          verificationCode: code.value,
        },
      });
      if (res.code == 200) {
        ElMessage({
          message: "登录成功!",
          type: "success",
        });
        phoneCookie.value = phoneNum.value;
        phoneState.value = phoneNum.value;
        token.value = useCookie("satoken");
        //跳转回原来的页面
        navigateTo(useRoute().query.redirect as string);
      } else {
        console.log("失败res", res);
      }
    }
  };
</script>

<template>
  <div class="w-full h-full flex justify-center items-center">
    <div
      class="bg-white w-80 h-60 flex flex-col p-4 box-border justify-between border-8 border-sopdf-600 mt-[-100px] ml-[-18px]"
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
        <button
          type="button"
          class="w-full bg-sopdf-100 text-white"
          @click="loginHandle"
        >
          {{ userStatus == "login" ? "登录" : "注册" }}
        </button>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
