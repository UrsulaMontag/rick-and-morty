import "./style.css";
const appContainer = document.querySelector("#app");
let currentFilter = "all";
appContainer.innerHTML = `
  <button data-js="fetchButton">Fetch</button>
  <form data-js="filter-form" aria-labeledby="form-heading">
    <fieldset>
      <legend id="form-heading">Filter by tags:</legend>
      <input
        name="tag-filter"
        value="all"
        class="tag-input"
        id="tag-all"
        type="radio"
        checked
      />
      <label class="tag-label" for="tag-all">all</label>
      <input
        name="tag-filter"
        value="Alive"
        class="tag-input"
        id="tag-alive"
        type="radio"
      />
      <label class="tag-label" for="tag-alive">Alive</label>
      <input
        name="tag-filter"
        value="Dead"
        class="tag-input"
        id="tag-dead"
        type="radio"
      />
      <label class="tag-label" for="tag-dead">Dead</label>
      <input
        name="tag-filter"
        value="unknown"
        class="tag-input"
        id="tag-unknown"
        type="radio"
      />
      <label class="tag-label" for="tag-unknown">unknown</label>
    </fieldset>
  </form>
`;
const fetchButton = document.querySelector('[data-js="fetchButton"]');
const urlApi = "https://rickandmortyapi.com/api/character";
fetchButton.addEventListener("click", () => {
  async function apiData(url) {
    try {
      const response = await fetch(url);
      const data = await response.json();
      console.log(data.results);
      return characters(data.results);
    } catch (error) {
      console.error("Oops, Fehler");
    }
  }
  apiData(urlApi);
});

const filterForm = document.querySelector("[data-js=filter-form]");

function characters(charData) {
  const listContainer = document.createElement("ul");
  appContainer.append(listContainer);
  charData
    .filter(
      (character) =>
        character.status.includes(currentFilter) || currentFilter === "all"
    )
    .forEach((character) => {
      const listItem = document.createElement("li");
      listItem.innerHTML = `
    <img src="${character.image}"/>
    <p>${character.name}</p>`;
      listContainer.append(listItem);
    });
}

filterForm.addEventListener("change", () => {
  currentFilter = filterForm.elements["tag-filter"].value;

  const data = apiData(urlApi);
  characters(data);
});
