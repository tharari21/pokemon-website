// control + ` to open command prompt
// Command + \ to open and close the file toolbar on the left
// command + option + i to open inspect in chrome
const pokemon = ["charmander", "bulbasaur", "squirtle"];
const pokemonIDs = ["001", "004", "007"];
// Loop over every ID,
// create HTML element
// Set HTML element values
// append HTML to the dom
pokemonIDs.map((id) => {
  let imageUrl = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${id}.png`;
  console.log(imageUrl);
  let img = document.createElement("img");
  img.src = imageUrl;
  img.setAttribute("height", "100px");
  img.setAttribute("width", "100px");
  document.body.append(img);
});
