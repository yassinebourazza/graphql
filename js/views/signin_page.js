export function SignInPage() {
    return `<img id="landing-img" src="/static/assets/landing.jpg" alt="jpg">
        <form class="auth-container glass-card">
            <h1>GraphX</h1>
            <h4>Enter your credentials to continue.</h4>
            <input id="username" class="input" type="text" name="username" placeholder="username of email">
            <input id="password" class="input" type="password" name="password" placeholder="password">
            <p id='error'></p>
            <button id="signin" class="button-style">Sign in</button>
        </form>
            <script type="module" src="/js/auth.js"></script>`
}