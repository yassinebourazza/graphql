import { LogOut } from "../auth/auth.js"
import { queryUserData } from "../graphql.js"
import { CreatGraphLine ,CreatRects } from "../svg.js"

export async function RenderProfilePage() {
    document.body.innerHTML = `<img id="landing-img" src="/static/assets/landing.jpg" alt="jpg">
        <main id="profile-main">
            <div id="user-infos" class="glass-card glass-profile">
                <img id="user-avatar" src="/static/assets/user.svg" >
                    <div id='user-infos-text'>
                        <button id="logout" class="glass-card">Log out</button>
                        <p>Username :</p>
                        <p>Full Name :</p>
                        <p>Email :</p>
                        <p>Phone :</p>
                        <p>City :</p>
                    </div>

            </div>
            <div id="user-stats" class="glass-profile">
                <div class="glass-card">
                    <p>Total Xp</p>
                    <p id='user-stats-totalxp'>0KB</p>
                </div>
                <div class="glass-card">
                    <p>Level</p>
                    <p id='user-stats-level'>0</p>

                </div>
                <div class="glass-card">
                    <p>Ratio</p>
                    <p id='user-stats-ratio'>0</p>
                </div>
                <div class="glass-card">
                    <p>Project Done</p>
                    <p id='user-stats-projectdone'>0</p>
                </div>
            </div>
            <div id="user-graph" class="glass-card glass-profile">
                <p>Graph</p>
                <div id="user-graph-container">
                    <div id='circle-pop' class="glass-card">
                        <p></p>
                        <p></p>
                        <p></p>
                    </div>


                </div>
            </div>
            <div id="user-progress" class="glass-card glass-profile">
                <p id="rect-pop">a</p>
                <p>Skills</p>
                <div id="user-progress-container"></div>
            </div>
            <div id="user-projects" class="glass-card glass-profile">
                <p id="user-projects-title">Project Done</p>
                <div id="projects-container">

                </div>
            </div>
        </main>`

    LogOut()

    let data = await GetUserData()
    console.log(data);
    if (data.errors) {
        return
    }
    let userInfosText = document.getElementById('user-infos-text').children
    let userProjects = document.getElementById('projects-container')
    let userStatsTotalXp = document.getElementById('user-stats-totalxp')
    let userStatsProjectDone = document.getElementById('user-stats-projectdone')
    let userStatsRatio = document.getElementById('user-stats-ratio')
    let userStatsLevel = document.getElementById('user-stats-level')
    let avatar = document.getElementById('user-avatar')
    let user = data.data.user[0].attrs
    let projects = data.data.projects
    let skills = data.data.skills
    let totalXp = 0
    console.log(user);
    console.log(projects);
    console.log(skills);


    console.log(user.firstName);
    avatar.setAttribute('src', user.avatarUrl);
    userInfosText[1].textContent = `Username : ${data.data.user[0].login}`
    userInfosText[2].textContent = `Full Name : ${user.firstName} ${user.lastName}`
    userInfosText[3].textContent = `Email : ${user.email}`
    userInfosText[4].textContent = `Phone : ${user.tel}`
    userInfosText[5].textContent = `City : ${user.addressCity}`

    projects.reverse()
    for (let project of projects) {
        let div = document.createElement('div')
        div.className = 'glass-card'
        div.innerHTML = `
        <p>${project.object.name}</p>
        <p>${XpFormat(project.amount)}</p>
        `
        userProjects.appendChild(div)
    }


    // skills

    console.log('---', skills);
    
    
    skills = skills.reduce((acc, current) => {
        if (!acc[current.type] || current.amount > acc[current.type].amount) {
            acc[current.type] = current;
        }
        return acc;
    }, {});
    
    CreatRects(skills)
    




    console.log(data.data.totalXp);

    totalXp = data.data.totalXp.reduce((cur, next) => cur + next.amount, 0)
    console.log(totalXp);

    userStatsTotalXp.textContent = XpFormat(totalXp)
    userStatsProjectDone.textContent = projects.length
    userStatsRatio.textContent = (data.data.user[0].auditRatio).toFixed(1)
    userStatsLevel.textContent = data.data.level[0].amount

    CreatGraphLine(projects, totalXp)
}

export function XpFormat(num) {
    return num < 1000000 ? Math.floor(num / 1000) + " KB" : (num / 1000000).toFixed(2) + " MB"
}


async function GetUserData() {
    const response = await fetch('https://learn.zone01oujda.ma/api/graphql-engine/v1/graphql', {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token'),
            'Content-Type': 'application/json'
        },

        body: JSON.stringify({ query: queryUserData }),
    });

    const data = await response.json();
    return data
}