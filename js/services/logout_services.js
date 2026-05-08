import { RenderSignInPage } from "../render/signin_render"

export function LogOut() {
  let logoutButton = document.getElementById('logout')

  logoutButton.addEventListener('click', ()=> {
    localStorage.removeItem('token')
    RenderSignInPage()
  })
}