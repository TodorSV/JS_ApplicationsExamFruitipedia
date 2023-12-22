import { html } from "../../node_modules/lit-html/lit-html.js";
import { dataService } from "../dataService.js";
import { userHelper } from "../userHelper.js";

const detailsTemplate = (item, isOwner) => html`
  <section id="details">
    <div id="details-wrapper">
      <img id="details-img" src=${item.imageUrl} alt="example1" />
      <p id="details-title">${item.name}</p>
      <div id="info-wrapper">
        <div id="details-description">
          <p>${item.description}</p>
          <p id="nutrition">Nutrition</p>
          <p id="details-nutrition">${item.nutrition}</p>
          </div>
        <!-- Edit and Delete only for creator -->
        <div id="action-buttons">
        ${isOwner ?
           html`
           
              <a href="/edit/${item._id}" id="edit-btn">Edit</a>
              <a href="" id="delete-btn" @click=${deleteFruit}>Delete</a>
            </div>
            `:  ""
        }
        </div>
    </div>
  </section>
`;

let context = null;

export async function showDetails(ctx) {
  context = ctx; 
  const id = context.params.id;
  const data = await dataService.getSingleFruit(id);
  const isOwner = await userHelper.getUserID() === data._ownerId;
  // const guest = userId === null;
  ctx.render(detailsTemplate(data, isOwner));
}

async function deleteFruit(e) {
  e.preventDefault();
  const id = context.params.id;
  await dataService.deleteFruit(id);
  context.goTo("/dashboard");
}
