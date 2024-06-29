//token
export const useToken = () =>
  useState<string>("token", () => {
    const token = useCookie<{ token: string | undefined }>("satoken");
    return token.value ? "Bearer " + token.value : "";
  });

//phonestate
export const usePhoneState = () =>
  useState<string>("phone", (): any => {
    const phoneState = useCookie<{ phoneState: string | undefined }>("phone");
    return phoneState.value ? phoneState.value : "";
  });
