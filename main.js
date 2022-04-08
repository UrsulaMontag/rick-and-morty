import "./style.css";
const appContainer = document.querySelector("#app");
appContainer.innerHTML = `
  <button data-js="fetchButton">Fetch</button>
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
  function characters(charData) {
    const listContainer = document.createElement("ul");
    appContainer.append(listContainer);
    charData.forEach((character) => {
      const listItem = document.createElement("li");
      listItem.innerHTML = `
      <img src="${character.image}"/>
      <p>${character.name}</p>`;
      listContainer.append(listItem);
    });
  }
});
