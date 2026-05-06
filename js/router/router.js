import { RenderProfilePage } from "../view/profile_page";
import { RenderSignInPage } from "../view/signin_page";
import { RenderErrorPage } from "../view/error_page";

const routes = {
  "/": RenderProfilePage,
  "/login": RenderSignInPage,
};

export function router() {

  const path = window.location.pathname;
  const page = routes[path] || RenderErrorPage;
  page();
}

export function navigate(url) {
  history.pushState({}, "", url);
  router();
}