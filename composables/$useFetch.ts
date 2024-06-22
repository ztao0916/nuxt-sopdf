import { useFetch, type UseFetchOptions } from "#app";

function isArray(str: unknown) {
  return Object.prototype.toString.call(str) === "[object Array]";
}

export const $useFetch = <T = unknown>(
  url: string,
  opts: UseFetchOptions<T, unknown>
) => {
  const runtimeConfig = useRuntimeConfig();
  // const satoken = useCookie("satoken");

  const defaultOptions: UseFetchOptions<unknown> = {
    baseURL: runtimeConfig.public.baseUrl,
    onRequest({ options }) {
      console.log("request", options);
      // if (satoken.value) {
      //   options.headers = {
      //     ...options.headers,
      //     satoken: satoken.value,
      //   };
      // }
    },
    onResponse({ response }) {
      // console.log("response", response);
      if (+response.status === 200 && +response._data.code !== 200) {
        ElMessage.error(response._data.msg);
      }
    },
    onResponseError({ response }) {
      // console.log("responseerror", response);
      ElMessage.error(
        isArray(response._data.msg) ? response._data.msg[0] : response._data.msg
      );
    },
  };

  return useFetch<T>(url, { ...defaultOptions, ...opts } as any);
};
