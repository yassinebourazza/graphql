// graph query

export const queryUserData = `
    
query {
  user {
    profile
    login
    attrs
    auditRatio
    campus
    createdAt
    totalDown
    totalUp
    updatedAt
  }
  
  
  
  progress(where: { eventId: { _eq: 41 } } ) {
    eventId
    groupId 
    
    createdAt
    
    path
    isDone
    group {
      captainLogin
      members {
        user {
          login
        }
      }
    }
  }
  
  

}
`