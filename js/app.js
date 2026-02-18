import { RenderProfilePage } from "./view/profile_page.js"
import { RenderSignInPage } from "./view/signin_page.js"

document.addEventListener('DOMContentLoaded', ()=> {
    if (!localStorage.getItem('token')) {
        console.log('makanch token');
        
        RenderSignInPage()
    } else {
        console.log('kayn token');
        RenderProfilePage()
    }
})