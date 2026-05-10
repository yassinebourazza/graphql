import { RenderSignInPage } from "../render/signin_render.js"

export function LogOut() {
  let logoutButton = document.getElementById('logout')
  
  logoutButton.addEventListener('click', ()=> {
    localStorage.removeItem('token')
    RenderSignInPage()
  })
}