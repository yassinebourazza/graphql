// svg charts

const svgNS = "http://www.w3.org/2000/svg"

export function CreatGraphLine(projects,totalXp) {
    let graph = document.getElementById('user-graph-container')

    const svg = document.createElementNS(svgNS, "svg");
    svg.setAttribute("width", "100%");
    svg.setAttribute("height", "100%");
    svg.style.borderLeft = '4px solid #ffffff4d'
    svg.style.borderBottom = '4px solid #ffffff4d'
    svg.style.display = 'flex'
    svg.style.justifyContent = 'space-between'

    projects.reverse()

    let dateStart = new Date(projects[0].createdAt)
    dateStart = new Date(dateStart.getTime() - 7 * 24 * 60 * 60 * 1000); // طرح 30 يوم

    let dateEnd = new Date(projects[projects.length-1].createdAt)
    let timeDef = dateEnd.getTime() - dateStart.getTime()
    console.log((dateEnd.getTime()-dateStart.getTime())/1000/60/60/24);

    let xpCounter = 0
    let countX= 0
    let countY= 100

    let lines = []
    let circles = []

    for (let project of projects) {
        xpCounter += project.amount
        const circle = document.createElementNS(svgNS, "circle");
        const line = document.createElementNS(svgNS, "line")
        let time = new Date(project.createdAt)
        let def = time.getTime() - dateStart.getTime()
        
        
        let posX = ((100/timeDef) * def)-1
        let posY = 100 - ((100/totalXp) * xpCounter)
        console.log(posX, posY);
        
        circle.setAttribute("cx", `${posX}%`);
        circle.setAttribute("cy", `${posY}%`);
        
        line.setAttribute('x1', `${countX}%`)
        line.setAttribute('y1', `${countY}%`)
        line.setAttribute('x2', `${posX}%`)
        line.setAttribute('y2', `${posY}%`)
        line.setAttribute("stroke", "#ffffff2f")
        line.setAttribute("stroke-width", "7")

        circle.addEventListener('mouseenter', ()=> {
            let pop = document.getElementById('circle-pop')
            pop.style.opacity = 1
            pop = pop.children
            
            let date = new Date(project.createdAt)
            pop[0].textContent = date.toLocaleDateString('en-US',{day: '2-digit', month: 'short', year: 'numeric' })
            pop[1].textContent = project.object.name
            pop[2].textContent = `${Math.floor(project.amount/1000)}KB`
        })

         circle.addEventListener('mouseleave', ()=> {
            let pop = document.getElementById('circle-pop')
            pop.style.opacity = 0
            pop = pop.children
            
            pop[0].textContent = ''
            pop[1].textContent = ''
            pop[2].textContent = ''
        })
        

        lines.push(line)
        circles.push(circle)
        
        countX = posX
        countY = posY
    }
    lines.forEach(line => {
        svg.appendChild(line)
    })

    circles.forEach(circle => {
        circle.classList.add('circle-hover')
        svg.appendChild(circle)
    })

    let valueParTime = document.createElement('div')
    valueParTime.id= 'graph-xp'
    valueParTime.innerHTML = `
    <p>${Math.floor(totalXp/1000)}KB</p>
    <p>${Math.floor(totalXp/7*6/1000)}KB</p>
    <p>${Math.floor(totalXp/7*5/1000)}KB</p>
    <p>${Math.floor(totalXp/7*4/1000)}KB</p>
    <p>${Math.floor(totalXp/7*3/1000)}KB</p>
    <p>${Math.floor(totalXp/7*2/1000)}KB</p>
    <p>${Math.floor(totalXp/7*1/1000)}KB</p>
    <p>${Math.floor(totalXp/7*0/1000)}KB</p>
    `
    console.log(valueParTime);
    
    graph.appendChild(valueParTime)
    graph.appendChild(svg);
}