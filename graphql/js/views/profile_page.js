export function ProfilePage() {

    return `<img id="landing-img" src="/static/assets/landing.jpg" alt="jpg">
        <main id="profile-main">
            <div id="user-infos" class="glass-card glass-profile">
                <img id="user-avatar" src="/static/assets/user.svg" >
                    <div id='user-infos-text'>
                        <button id="logout" class="glass-card">Log out</button>
                        <p>Username : Not provided</p>
                        <p>Full Name : Not provided</p>
                        <p>Email : Not provided</p>
                        <p>Phone : Not provided</p>
                        <p>City : Not provided</p>
                    </div>

            </div>
            <div id="user-stats" class="glass-profile">
                <div class="glass-card">
                    <p>Total Xp</p>
                    <p id='user-stats-totalxp'>0 KB</p>
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
}