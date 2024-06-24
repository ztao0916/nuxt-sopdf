export default defineNuxtRouteMiddleware(() => {
  const isLoggedIn = useState("isLoggedIn", () => false);

  if (import.meta.server) {
    const sessionToken = useCookie("satoken");
    console.log("satoken", sessionToken.value);
    if (sessionToken.value !== undefined) {
      isLoggedIn.value = true;
    }
  }

  if (isLoggedIn.value) {
    return;
  }

  return navigateTo("/login");
});
