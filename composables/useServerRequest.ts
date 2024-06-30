import { type UseFetchOptions } from "#app";

export const useServerRequest = <T = unknown>(
  url: string,
  opts: UseFetchOptions<T, unknown>
) => {
  const runtimeConfig = useRuntimeConfig();
  const satoken = useCookie("satoken");

  const defaultOptions: UseFetchOptions<unknown> = {
    baseURL: runtimeConfig.public.baseUrl,
    onRequest({ options }) {
      // 设置请求头
      options.headers = (options.headers || {}) as { [key: string]: string };
      // console.log("request", options);
      if (satoken.value) {
        options.headers.Authorization = "Bearer " + satoken.value;
      }
    },
    onResponse({ response }) {
      // console.log("response", response);
      if (+response.status === 200 && +response._data.code !== 200) {
        import.meta.client &&
          ElMessage.error(response._data.msg || "服务器返回错误");
      }
    },
    onResponseError({ response }) {
      // console.log("responseerror", response);
      import.meta.client &&
        ElMessage.error(response._data.msg || "服务器返回错误");
    },
  };

  return useFetch<T>(url, { ...defaultOptions, ...opts } as any);
};
