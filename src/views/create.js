import { html } from "../../node_modules/lit-html/lit-html.js";
import { dataService } from "../dataService.js";


const createTemplate = () => html`
  <section id="create">
    <div class="form">
      <h2>Add Fruit</h2>
      <form class="create-form" @submit=${submitHandler}>
        <input type="text" name="name" id="name" placeholder="Fruit Name" />
        <input
          type="text"
          name="imageUrl"
          id="Fruit-image"
          placeholder="Fruit Image"
        />
        <textarea
          id="fruit-description"
          name="description"
          placeholder="Description"
          rows="10"
          cols="50"
        ></textarea>
        <textarea
          id="fruit-nutrition"
          name="nutrition"
          placeholder="Nutrition"
          rows="10"
          cols="50"
        ></textarea>
        <button type="submit">Add Fruit</button>
      </form>

    </div>
  </section>
`;


let context = null;
export function showCreate(ctx) {
    context = ctx;
    context.render(createTemplate());
}



async function submitHandler(e) {
    e.preventDefault();

    let formData = new FormData(e.target);
    
    const name = formData.get("name");
    const imageUrl = formData.get("imageUrl");
    const description = formData.get("description");
    const nutrition = formData.get("nutrition");

    if (!name || !imageUrl || !description || !nutrition) {
        return window.alert("Error");
    }
    await dataService.createFruit({name, imageUrl, description, nutrition});
    //Redirect to fruits page
    context.goTo("/dashboard");
}
