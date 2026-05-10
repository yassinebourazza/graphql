import { LogOut } from "../services/logout_services.js"
import { ProfilePage } from "../views/profile_page.js"
import { GetUserData } from "../services/getuserdata_services.js"
import { UserInfoRendring, UserProjectsRendring, UserSectionsRendring, UserSkillsRendring } from "./userdata_render.js"
import { RenderSignInPage } from "./signin_render.js";

export async function RenderProfilePage() {
    
    let data = await GetUserData()
    if (data.errors) {
        localStorage.removeItem('token')
        RenderSignInPage()
        return 
    }    
    
    document.body.innerHTML = ProfilePage()
    LogOut()
    
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
    let totalXp = data.data.totalXp.reduce((cur, next) => cur + next.amount, 0) 

    // infos
    UserInfoRendring(data,user,avatar,userInfosText)
    // projects / graph
    UserProjectsRendring(projects,userProjects,totalXp)
    // skills
    UserSkillsRendring(skills)
    // sections
    UserSectionsRendring(data,userStatsTotalXp,userStatsProjectDone,userStatsRatio,userStatsLevel,totalXp,projects)
    
}

