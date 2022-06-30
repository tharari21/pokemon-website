// control + ` to open command prompt
// Command + \ to open and close the file toolbar on the left
// command + option + i to open inspect in chrome
const pokemonArr = [
  { id: "001", name: "Bulbasaur" },
  { id: "004", name: "Charmander" },
  { id: "007", name: "Squirtle" },
];

const userRoster = [];

// Value will be null if there is no element with id container.
const containerDiv = document.querySelector("#container");
const newBtn = document.querySelector("#new-pokemon-btn");
const rosterDiv = document.querySelector("#roster");

const promptUserForPokemonId = () => {
  // prompt user for pokemon ID
  let pokemonId = prompt("ENTER A POKEMON NUMBER");
  // The dataUrl takes numbers without the 0 padded to the left so let's have a separate variable to store the pokemonId for dataUrl
  // If ID length is greater than 3, it's invalid
  while (pokemonId.length > 3) {
    pokemonId = prompt("POKEMON ID MUST BE 3 DIGITS. ENTER A POKEMON ID");
  }
  if (pokemonId.length === 1) {
    pokemonId = pokemonId.padStart(2);
  } else if (pokemonId.length === 2) {
    pokemonId = pokemonId.padStart(1);
  }
  console.log(pokemonId);
  return pokemonId;
};

const addPokemonToRoster = async () => {
  const pokemonId = promptUserForPokemonId();

  let imageUrl = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${pokemonId}.png`;
  console.log(parseInt(pokemonId).toString());
  let dataUrl = `https://pokeapi.co/api/v2/pokemon/${parseInt(
    pokemonId
  ).toString()}`;

  let req = await fetch(dataUrl);
  let res = await req.json();
  let pokemonName = res.forms[0].name;
  let audioUrl = `https://play.pokemonshowdown.com/audio/cries/${pokemonName}.mp3`;
  let audio = document.createElement("audio");
  let source = document.createElement("source");
  source.setAttribute("src", audioUrl);
  source.setAttribute("type", "audio/mpeg");
  audio.append(source);

  let h3 = document.createElement("h3");
  h3.innerText = pokemonName;

  let img = document.createElement("img");
  img.setAttribute("src", imageUrl);
  img.setAttribute("class", "roster-img");
  let position = document.querySelector(`#pokemon-${userRoster.length + 1}`);
  position.addEventListener("click", () => {
    audio.play();
  });
  position.append(img, h3, audio);
  userRoster.push(pokemonId);
};

newBtn.addEventListener("click", addPokemonToRoster);
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
});
