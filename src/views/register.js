import { html } from "../../node_modules/lit-html/lit-html.js";
import { userService } from "../userService.js";

const registerTemplate = () => html`
  <section id="register">
    <div class="form">
      <h2>Register</h2>
      <form class="register-form" @submit=${submitHandler}>
        <input
          type="text"
          name="email"
          id="register-email"
          placeholder="email"
        />
        <input
          type="password"
          name="password"
          id="register-password"
          placeholder="password"
        />
        <input
          type="password"
          name="re-password"
          id="repeat-password"
          placeholder="repeat password"
        />
        <button type="submit">register</button>
        <p class="message">Already registered? <a href="/login">Login</a></p>
      </form>
    </div>
  </section>
`;

let context = null;

export function showRegister(ctx) {
  ctx.render(registerTemplate());
  context = ctx;
}

async function submitHandler(e) {
  e.preventDefault();
  const formDate = new FormData(e.target);
  const email = formDate.get("email");
  const password = formDate.get("password");
  const rePass = formDate.get("re-password");

  if (!email || !password || !rePass || rePass !== password) {
    return window.alert("Error");
  }

  try {
    await userService.register(email, password);
    context.updateNav();
    context.goTo("/");
  } catch (error) {
    window.alert(error.message);
  }
}
