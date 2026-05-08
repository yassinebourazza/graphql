import { queryUserData } from "../utils/graphql.js"

export async function GetUserData() {
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