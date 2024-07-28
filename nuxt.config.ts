// https://nuxt.com/docs/api/configuration/nuxt-config
//别名@,默认内置
import { defineNuxtConfig } from "nuxt/config";
//转发服务器
const commonUrl = "https://sopdf.cn/api";
export default defineNuxtConfig({
  ssr: true,
  devtools: { enabled: false },
  modules: ["@nuxt/ui", "@element-plus/nuxt", "@nuxtjs/sitemap"],
  site: {
    url: "https://sopdf.cn",
    name: "sopdf",
  },
  //项目是前后端分离的,所以要做代理转发,解决跨域问题
  nitro: {
    devProxy: {
      "/api": {
        target: commonUrl,
        changeOrigin: true,
        prependPath: true,
      },
      "/proxy/example": { target: "https://example.com", changeOrigin: true },
    },
    // 该配置用于服务端请求转发
    routeRules: {
      "/api/**": {
        proxy: `${commonUrl}/**`,
      },
    },
  },
  runtimeConfig: {
    public: {
      baseUrl: "/api",
      commonUrl: commonUrl,
    },
  },
});
