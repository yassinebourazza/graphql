
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
      'Authorization': 'Basic ' + btoa(`${username}:${password}`),
      'Content-Type': 'application/json'
    }
  });

  if (response.ok) {
    const token = await response.json();
    localStorage.setItem('jwt', token); // حفظ التوكن
    console.log(localStorage.getItem('token')); // حفظ التوكن
    console.log("s7i7", token);
  } else {
    console.log("ghalat");
    
    }
});

}