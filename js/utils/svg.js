import {XpFormat} from './xpformat.js'
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
        console.log("++++",project);
        
        xpCounter += project.amount
        const circle = document.createElementNS(svgNS, "circle");
        const line = document.createElementNS(svgNS, "line")
        let time = new Date(project.createdAt)
        let def = time.getTime() - dateStart.getTime()
        
        
        let posX = ((100/timeDef) * def)-1
        let posY = 100 - ((100/totalXp) * xpCounter)
        console.log(posX, posY, totalXp , xpCounter);
        
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
    <p>${XpFormat(totalXp)}</p>
    <p>${XpFormat(totalXp/7*6)}</p>
    <p>${XpFormat(totalXp/7*5)}</p>
    <p>${XpFormat(totalXp/7*4)}</p>
    <p>${XpFormat(totalXp/7*3)}</p>
    <p>${XpFormat(totalXp/7*2)}</p>
    <p>${XpFormat(totalXp/7*1)}</p>
    <p>${XpFormat(0)}</p>
    `
    console.log(valueParTime);
    
    graph.appendChild(valueParTime)
    graph.appendChild(svg);
}

export function CreatRects(skills) {
    console.log("skills :" , skills);
    const container = document.getElementById('user-progress-container')
    const svg = document.createElementNS(svgNS, "svg");
    svg.setAttribute("width", "100%");
    svg.setAttribute("height", "100%");
    svg.style.display = 'flex'
    svg.style.justifyContent = 'space-between'

    let posX = 0
    for (let skill of Object.values(skills)) {
        console.log(skill);
        
        const rect = document.createElementNS(svgNS, "rect")
        rect.setAttribute("x", `${posX}%`);
        rect.setAttribute("y", `${100-skill.amount}%`);
        rect.setAttribute("rx", 3);
        rect.setAttribute("width", 12);
        rect.setAttribute("height", `${skill.amount}%`); 
        rect.style.fill = '#adadad41'
        rect.style.marginTop = 'auto'
        rect.style.borderRadius = '5px'
        svg.appendChild(rect)
        posX+= 100/Object.keys(skills).length


        rect.addEventListener('mouseenter', ()=> {
            let pop = document.getElementById('rect-pop')
            pop.style.opacity = 1
            rect.style.fill = '#afadad88'
            pop.innerHTML = `${skill.type.split('_')[1]} : ${skill.amount}`
        })

         rect.addEventListener('mouseleave', ()=> {
            let pop = document.getElementById('rect-pop')
            rect.style.fill = '#adadad41'
            pop.style.opacity = 0
        })

    }
    console.log(skills);
    console.log(Object.keys(skills).length);
    
    container.appendChild(svg);

}