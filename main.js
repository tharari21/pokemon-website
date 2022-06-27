// control + ` to open command prompt
// Command + \ to open and close the file toolbar on the left
// command + option + i to open inspect in chrome
const pokemon = ["charmander", "bulbasaur", "squirtle"];
const pokemonIDs = ["001", "004", "007"];
// Value will be null if there is no element with id container.
const containerDiv = document.querySelector("#container");

// Loop over every ID,
// create HTML element
// Set HTML element values
// append HTML to the dom
pokemonIDs.map((id) => {
  let imageUrl = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${id}.png`;
  console.log(imageUrl);
  let div = document.createElement("div"); // Adding a div to house the img element
  //   document.setAttribute("class", "pokemon-card");
  div.className = "pokemon-card"; // Setting the class of the div
  let img = document.createElement("img");
  img.src = imageUrl;
  div.append(img);
  containerDiv.append(div);
  //   document.querySelector(".pokemon-list").append(img);
});
