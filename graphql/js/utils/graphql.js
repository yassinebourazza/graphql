export const queryUserData = `
    
query {
  user {
    profile
    login
    attrs
    auditRatio
    campus
    createdAt
    updatedAt
  }
  
  
   level : transaction (where: {type: {_eq:"level"}}
    order_by: {createdAt: desc} 
    limit: 1)
  {
    amount
  }

  totalXp : transaction(where : {_and :[
    {type : { _eq :"xp"}}
  	{eventId:{ _eq: 41}}
  ]}) {
    amount  
  }
  
    
  projects: transaction (where: {_and: [
    {type: {_eq: "xp"}},
    {event:{object:{name:{_eq:"Module"}}}}
    {_or: [
          {object: {type: {_eq: "project"}}},
          {object: {type: {_eq: "piscine"}}}
        ]}
  ]}
    order_by: {createdAt: asc}
    ) {
    type
      object {
        name
        type
        
      }
    amount
    createdAt

  }
 
   skills: transaction(
    where: {
      type: {_ilike: "%skill%"}
    }
    order_by: {amount: desc}
  ) {
    type
    amount
    path
  }
  
  

}
`