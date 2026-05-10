import { RenderProfilePage } from "../render/profile_render.js"
import { RenderSignInPage } from "../render/signin_render.js"
import { SignIn } from "../services/signin_services.js"

document.addEventListener('DOMContentLoaded', ()=> {
    if (!localStorage.getItem('token')) {        
        RenderSignInPage()
    } else {
        SignIn()
    }
})