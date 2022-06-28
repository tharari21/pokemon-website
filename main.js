// control + ` to open command prompt
// Command + \ to open and close the file toolbar on the left
// command + option + i to open inspect in chrome
const pokemonArr = [
  { id: "001", name: "Bulbasaur" },
  { id: "004", name: "Charmander" },
  { id: "007", name: "Squirtle" },
];

// Value will be null if there is no element with id container.
const containerDiv = document.querySelector("#container");

// Loop over every ID,
// create HTML element
// Set HTML element values
// append HTML to the dom
pokemonArr.map((pokemon, index) => {
  let imageUrl = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${pokemon.id}.png`;
  console.log(pokemon.name);
  let div = document.createElement("div"); // Adding a div to house the img element
  let h3 = document.createElement("h3");
  h3.innerText = pokemon.name;
  //   document.setAttribute("class", "pokemon-card");
  div.className = "pokemon-card"; // Setting the class of the div
  let img = document.createElement("img");
  img.src = imageUrl;
  div.append(img, h3);
  containerDiv.append(div);
  //   document.querySelector(".pokemon-list").append(img);
});
