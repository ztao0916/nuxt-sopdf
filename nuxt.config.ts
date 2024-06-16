// https://nuxt.com/docs/api/configuration/nuxt-config
//别名@,默认内置
import { defineNuxtConfig } from "nuxt/config";
export default defineNuxtConfig({
  devtools: { enabled: false },
  modules: ["@pinia/nuxt", "@nuxt/ui"],
});
