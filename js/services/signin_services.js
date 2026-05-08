import { RenderProfilePage } from "../render/profile_render.js";
import { RenderSignInPage } from "../render/signin_render.js";
import { bytesToBase64 } from "../utils/tobase64.js"

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
        'Authorization': 'Basic ' + bytesToBase64(`${username}:${password}`),
        'Content-Type': 'application/json'
      }
    });

    const data = await response.json();
    if (response.ok) {
      localStorage.setItem('token', data);
      RenderProfilePage()
    } else {
      errorMsg.textContent = data.error

    }
  });

}
