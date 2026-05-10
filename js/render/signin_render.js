import { SignIn } from "../services/signin_services.js"
import { SignInPage } from "../views/signin_page.js"


export function RenderSignInPage() {
    document.body.innerHTML = SignInPage()
    
    SignIn()
}
