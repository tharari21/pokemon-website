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
const newBtn = document.querySelector("#new-pokemon-btn");
const rosterDiv = document.querySelector("#roster");

newBtn.addEventListener("click", () => {
  let pokemonId = prompt("ENTER A POKEMON NUMBER");
  let div = document.createElement("div");
  div.className = "pokemon-card";
  let imageUrl = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${pokemonId}.png`;
  let img = document.createElement("img");
  img.setAttribute("src", imageUrl);
  div.append(img);
  containerDiv.append(div);
});
// Loop over every ID,
// create HTML element
// Set HTML element values
// append HTML to the dom
pokemonArr.map((pokemon, index) => {
  let imageUrl = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${pokemon.id}.png`;
  let div = document.createElement("div"); // Adding a div to house the img element
  let h3 = document.createElement("h3");
  h3.innerText = pokemon.name;
  //   document.setAttribute("class", "pokemon-card");
  div.className = "pokemon-card"; // Setting the class of the div
  let img = document.createElement("img");
  let audioUrl = `https://play.pokemonshowdown.com/audio/cries/${pokemon.name.toLowerCase()}.mp3`;
  let audio = document.createElement("audio");
  let source = document.createElement("source");
  source.setAttribute("src", audioUrl);
  source.setAttribute("type", "audio/mpeg");
  audio.append(source);
  div.addEventListener("click", () => {
    audio.play();
  });
  img.src = imageUrl;
  div.append(img, h3, audio);
  containerDiv.append(div);
  //   document.querySelector(".pokemon-list").append(img);
});
