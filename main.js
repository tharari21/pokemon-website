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

const playAudio = (audio) => {
  audio.play();
};

const removeAllChildNodes = (parent) => {
  while (parent.firstChild) {
    console.log(parent.firstChild);
    parent.removeChild(parent.firstChild);
  }
};

const getPokemonId = () => {
  "Get pokemon ID from user to add new pokemon to roster";
  let pokemonId = prompt("ENTER A POKEMON NUMBER");
  // The dataUrl takes numbers without the 0 padded to the left so let's have a separate variable to store the pokemonId for dataUrl
  // If ID length is greater than 3, it's invalid
  while (pokemonId.length > 3 || pokemonId.length === 0 || pokemonId === null) {
    pokemonId = prompt("POKEMON ID MUST BE 3 DIGITS. ENTER A POKEMON ID");
  }
  pokemonId = pokemonId.padStart(3, "0");
  return pokemonId;
};
const getPokemonName = async (pokemonId) => {
  let dataUrl = `https://pokeapi.co/api/v2/pokemon/${parseInt(
    pokemonId
  ).toString()}`;
  let req = await fetch(dataUrl);
  let res = await req.json();
  let pokemonName = res.forms[0].name;
  return pokemonName;
};

const removePokemonFromRoster = (pokemonName) => {
  let confirmation = confirm(
    `ARE YOU SURE YOU WOULD LIKE TO DELETE ${pokemonName} FROM YOUR ROSTER`
  );
  if (confirmation) {
    // Remove pokemon
    let deletedIndex;
    for (let index = 0; index < userRoster.length; index++) {
      if (
        userRoster[index][1].textContent.toLowerCase() ===
        pokemonName.toLowerCase()
      ) {
        deletedIndex = index;
      }
    }
    let position = document.querySelector(`#pokemon-${deletedIndex + 1}`);
    let audio = position.querySelector("audio");

    position.removeEventListener("click", () => playAudio(audio));
    removeAllChildNodes(position);

    userRoster.splice(deletedIndex, 1);
    displayRoster();

    let curPosition;
    let nextPosition;
    let curAudio;
    let nextAudio;
    while (deletedIndex < userRoster.length) {
      // scoot each event listener over
      curPosition = document.querySelector(`#pokemon-${deletedIndex + 1}`);
      nextPosition = document.querySelector(`#pokemon-${deletedIndex + 2}`);
      curAudio = curPosition.querySelector("audio");
      console.log("curAudio", curAudio);
      nextAudio = nextPosition.querySelector("audio");
      console.log("nextAudio", nextAudio);
      curPosition.removeEventListener("click", () => playAudio(curAudio));
      if (nextAudio) {
        curPosition.addEventListener("click", () => playAudio(nextAudio));
      }
      deletedIndex++;
    }
  }
};

const addPokemonToRoster = async () => {
  "Add a new pokemon to roster";
  if (userRoster.length === 6) {
    alert("YOU CANNOT HAVE MORE THAN 6 POKEMON IN YOUR ROSTER");
    return;
  }
  const pokemonId = getPokemonId();
  let imageUrl = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${pokemonId}.png`;
  let pokemonName = await getPokemonName(pokemonId);
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

  position.addEventListener("click", () => playAudio(audio));

  let deleteBtn = document.createElement("button");
  deleteBtn.textContent = "X";
  deleteBtn.addEventListener("click", () => {
    removePokemonFromRoster(pokemonName);
  });
  // position.append(img, h3, deleteBtn, audio);
  userRoster.push([img, h3, deleteBtn, audio]);
  displayRoster();
};

const displayRoster = () => {
  ("Displays userRoster array as roster");
  userRoster.forEach((elements, index) => {
    let position = document.querySelector(`#pokemon-${index + 1}`);
    removeAllChildNodes(position);
    let [img, h3, deleteBtn, audio] = elements;
    position.append(img, h3, deleteBtn, audio);
  });
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
