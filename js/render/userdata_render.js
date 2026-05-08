import { XpFormat } from "../utils/xpformat.js";
import { CreatGraphLine, CreatRects } from "../utils/svg.js"


export function UserInfoRendring(data,user,avatar,userInfosText) {
    //if (user.avatarUrl) avatar.setAttribute('src', user.avatarUrl);
    //userInfosText[1].textContent = `Username : ${data.data.user[0].login ? data.data.user[0].login : "Not provided"}`
    //userInfosText[2].textContent = `Full Name : ${user.firstName && user.lastName ? user.firstName + " " + user.lastName : "Not provided" }`
    //userInfosText[3].textContent = `Email : ${user.email ? user.email : "Not provided"}`
    //userInfosText[4].textContent = `Phone : ${user.tel ? user.tel : "Not provided"}`
    //userInfosText[5].textContent = `City : ${user.addressCity ? user.addressCity : "Not provided"}`
}

export function UserProjectsRendring(projects, userProjects, totalXp) {
        if (projects.length > 0) {
    
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
    
            CreatGraphLine(projects, totalXp)
            
        } else {
            const container = document.getElementById('user-graph')
            container.style.minHeight = 'auto'
            document.getElementById('user-graph-container').remove()
            document.getElementById('user-progress-container').remove()
            let pProjects = document.createElement('p')
            let pGraph = document.createElement('p')
            pProjects.textContent = "No completed projects yet."
            pGraph.textContent = "No graph data available yet."
            pProjects.className = 'para-error'
            pGraph.className = 'para-error'
            userProjects.appendChild(pProjects)
            container.appendChild(pGraph)
        }
}

export function UserSkillsRendring(skills) {

    if (skills.length > 0) {

        skills = skills.reduce((acc, current) => {
            if (!acc[current.type] || current.amount > acc[current.type].amount) {
                acc[current.type] = current;
            }
            return acc;
        }, {});
    
        CreatRects(skills)
        
    } else {
        const container = document.getElementById('user-progress')
        let pSkills = document.createElement('p')
        pSkills.textContent = "No skills added yet."
        pSkills.className = 'para-error'
        container.appendChild(pSkills)
    }
}

export function UserSectionsRendring(data,userStatsTotalXp,userStatsProjectDone,userStatsRatio,userStatsLevel,totalXp,projects) {

    userStatsTotalXp.textContent = XpFormat(totalXp)
    userStatsProjectDone.textContent = projects ? projects.length : "0"
    userStatsRatio.textContent = data.data.user[0]?.auditRatio ? data.data.user[0]?.auditRatio?.toFixed(1) : "0" 
    userStatsLevel.textContent = data.data.level[0]?.amount ? data.data.level[0]?.amount : "0" 

}