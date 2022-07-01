// control + ` to open command prompt
// Command + \ to open and close the file toolbar on the left
// command + option + i to open inspect in chrome
const pokemonArr = [
  { id: "001", name: "Bulbasaur" },
  { id: "004", name: "Charmander" },
  { id: "007", name: "Squirtle" },
];

const userRoster = {};

// Value will be null if there is no element with id container.
const containerDiv = document.querySelector("#container");
const newBtn = document.querySelector("#new-pokemon-btn");
const rosterDiv = document.querySelector("#roster");

const displayRoster = () => {
  // Displays userRoster array as roster"
  Object.entries(userRoster).forEach(([, value], index) => {
    let position = getRosterSlot(index + 1);
    let [img, h3, deleteBtn, audio] = value;
    position.append(img, h3, deleteBtn, audio);
  });
};

const playAudio = (audio) => {
  audio.play();
};

const removeAllChildNodes = (parent) => {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
};

const promptUserForPokemonId = () => {
  // prompt user for pokemon ID
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
  // fetches pokemon name from dataUrl
  // URL to get pokemon name
  let dataUrl = `https://pokeapi.co/api/v2/pokemon/${parseInt(
    pokemonId
  ).toString()}`;
  let req = await fetch(dataUrl);
  let res = await req.json();
  return res.forms[0].name;
};
const getAudioTag = (audioUrl) => {
  // Returns an audio element with the audio of audioUrl
  let audio = document.createElement("audio");
  let source = document.createElement("source");
  source.setAttribute("src", audioUrl);
  source.setAttribute("type", "audio/mpeg");
  audio.append(source);
  return audio;
};
const getImageTag = (imageUrl) => {
  let img = document.createElement("img");
  img.setAttribute("src", imageUrl);
  img.setAttribute("class", "roster-img");
  return img;
};
const getRosterSlot = (index) => {
  return document.querySelector(`#pokemon-${index}`);
};
const getObjectLength = (obj) => {
  return Object.keys(obj).length;
};

const removePokemonFromRoster = (position, pokemonId) => {
  let confirmation = confirm(
    `ARE YOU SURE YOU WOULD LIKE TO DELETE THIS POKEMON FROM YOUR ROSTER`
  );
  if (confirmation) {
    // Remove pokemon from userRoster
    console.log("Before delete", userRoster);
    console.log(pokemonId);
    delete userRoster[pokemonId];
    console.log("After delete", userRoster);

    // Get deleted position's audio element
    let audio = position.querySelector("audio");
    // Remove all children of deleted position
    removeAllChildNodes(position);
    // Remove event listener of deleted position
    position.removeEventListener("click", () => playAudio(audio));

    /* Ask Michael if there is a better solution
       Goal here is to scoot each event listener over 1 index. 
       This requires removing the current one and adding the next one to curPosition
    */
    // Gets the position index of the deleted position
    let index = parseInt(position.id.slice(-1));
    // Store the current position
    let curPosition = document.querySelector(`#pokemon-${index + 1}`);
    // Store the next position
    let nextPosition = document.querySelector(`#pokemon-${index + 2}`);
    // Store current position's audio
    let curAudio;
    // Store next position's audio
    let nextAudio;
    while (curPosition) {
      // scoot each event listener over
      curAudio = curPosition.querySelector("audio");

      curPosition.removeEventListener("click", () => playAudio(curAudio));
      if (nextPosition) {
        nextAudio = nextPosition.querySelector("audio");
        curPosition.addEventListener("click", () => playAudio(nextAudio));
      }
      index++;
      curPosition = document.querySelector(`#pokemon-${index + 1}`);
      nextPosition = document.querySelector(`#pokemon-${index + 2}`);
    }

    displayRoster();
  }
};

const addPokemonToRoster = async () => {
  // Check that user has less than 6 pokemon
  if (userRoster.length === 6) {
    alert("YOU CANNOT HAVE MORE THAN 6 POKEMON IN YOUR ROSTER");
    return;
  }
  // Get a pokemon ID from user
  const pokemonId = promptUserForPokemonId();

  // URL for pokemon image
  let imageUrl = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${pokemonId}.png`;

  // Get pokemon name
  let pokemonName = await getPokemonName(pokemonId);
  // Create an audio tag for pokemon audio
  let audioUrl = `https://play.pokemonshowdown.com/audio/cries/${pokemonName}.mp3`;
  let audio = getAudioTag(audioUrl);

  let h3 = document.createElement("h3");
  h3.innerText = pokemonName;

  // Create img tag for pokemon
  let img = getImageTag(imageUrl);

  // Get next div to insert pokemon
  let position = getRosterSlot(getObjectLength(userRoster) + 1);
  position.addEventListener("click", () => {
    playAudio(audio);
  });

  let deleteBtn = document.createElement("button");
  deleteBtn.textContent = "X";
  deleteBtn.addEventListener("click", () => {
    removePokemonFromRoster(position, pokemonId);
  });
  // position.append(img, h3, del
  userRoster[pokemonId] = [img, h3, deleteBtn, audio];
  displayRoster();
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
