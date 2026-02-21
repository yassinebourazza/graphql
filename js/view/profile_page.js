import { LogOut } from "../auth/auth.js"
import {queryUserData} from "../graphql.js"

export async function RenderProfilePage() {
    document.body.innerHTML = `<img id="landing-img" src="/static/assets/landing.jpg" alt="jpg">
    <main id="profile-main">
        <div id="user-infos" class="glass-card glass-profile">
            <img id="user-avatar" src="/static/assets/user.svg" >
            <div id='user-infos-text'>
                <button id="logout" class="glass-card">Log out</button>
                <p>Username :</p>
                <p>Full Name :</p>
                <p>C.I.N :</p>
                <p>Email :</p>
                <p>Phone :</p>
                <p>City :</p>
                <p>cumpus :</p>
            
            </div>

        </div>
        <div id="user-stats" class="glass-profile">
            <div class="glass-card">
                <p>Total Xp</p>
                <p>0KB</p>
            </div>
            <div class="glass-card">
                <p>Level</p>
                <p>0</p>

            </div>
            <div class="glass-card">
                <p>Ratio</p>
                <p>0</p>
            </div>
            <div class="glass-card">
                <p>Project Done</p>
                <p>0</p>
            </div>
        </div>
        <div id="user-projects" class="glass-card glass-profile">
            <p id="user-projects-title">Project Done</p>
            <div id="projects-container">
                <div class="glass-card">
                    <p>Ascii-Art-Web</p>
                    <p>10KB</p>
                </div>
            </div>
        </div>
        <div id="user-graph" class="glass-card glass-profile">
            <p>graph</p>
        </div>
        <div id="user-progress" class="glass-card glass-profile">
            <p>skills</p>
        </div>
    </main>
`
    LogOut()    

    let data = await GetUserData()
    console.log(data);
    if (data.errors) {
      return
    }
    let userInfosText = document.getElementById('user-infos-text').children
    let avatar = document.getElementById('user-avatar')
    let user = data.data.user[0].attrs
    let projects = data.data.progress
    let removeDuplicate = []
    console.log(user);
    console.log(projects);

    console.log(user.firstName);
    avatar.setAttribute('src', user.avatarUrl);
    userInfosText[1].textContent = `Username : ${data.data.user[0].login}`
    userInfosText[2].textContent = `Full Name : ${user.firstName} ${user.lastName}`
    userInfosText[3].textContent = `C.I.N : ${user.cin}`
    userInfosText[4].textContent = `Email : ${user.mail}`
    userInfosText[5].textContent = `Phone : ${user.tel}`
    userInfosText[6].textContent = `City : ${user.addressCity}`
    userInfosText[7].textContent = `Campus : ${data.data.user[0].campus}`


//    for (projects of projects) {
//        console.log(projects);
//        
//    }

}


async function GetUserData() {
     const response = await fetch('https://learn.zone01oujda.ma/api/graphql-engine/v1/graphql', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token') ,
        'Content-Type': 'application/json'
      },

      body: JSON.stringify({query: queryUserData}) ,
    });
    
    const data = await response.json();
    return data
}