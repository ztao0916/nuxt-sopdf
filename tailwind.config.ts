import type { Config } from "tailwindcss";

export default <Partial<Config>>{
  theme: {
    extend: {
      aspectRatio: {
        auto: "auto",
        square: "1 / 1",
        video: "16 / 9",
      },
      colors: {
        sopdf: {
          100: "rgb(235,125,45)", //橙色高亮
          200: "rgb(250,50,50)", //红色高亮
          300: "rgb(35,65,175)", //蓝色
          400: "rgb(145,145,145)", //灰色
          500: "rgb(35,35,35)", //黑色
        },
      },
    },
  },
};
