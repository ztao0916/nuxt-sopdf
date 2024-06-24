export default defineNuxtRouteMiddleware(() => {
  const token = useCookie("satoken");
  if (!token?.value) {
    return navigateTo("/login");
  }
});
