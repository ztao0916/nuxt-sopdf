/** 用户信息 **/
export const useToken = () =>
  useState<string>("token", () => {
    const token = useCookie<{ token: string | undefined }>("token");
    return token.value ? "Bearer " + token.value : "";
  });

//搜索内容key
export const useSearch = () => useState<string>("search", () => "");
