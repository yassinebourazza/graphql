import { RenderProfilePage } from "../view/profile_page.js";
import { RenderSignInPage } from "../view/signin_page.js";
export function SignIn() {
  
  const signinButton = document.getElementById('signin');
  const errorMsg = document.getElementById('error');

  signinButton.addEventListener('click', async (e) => {
        e.preventDefault()
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const response = await fetch('https://learn.zone01oujda.ma/api/auth/signin', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + btoa(`${username}:${password}`),
        'Content-Type': 'application/json'
      }
    });

    const data = await response.json();
    if (response.ok) {
      localStorage.setItem('token', data);
      console.log(localStorage.getItem('token'));
      console.log("s7i7", data);
      RenderProfilePage()
    } else {
        errorMsg.textContent = data.error

    }
  });

}

export function LogOut() {
  let logoutButton = document.getElementById('logout')

  logoutButton.addEventListener('click', ()=> {
    localStorage.removeItem('token')
    RenderSignInPage()
  })
}