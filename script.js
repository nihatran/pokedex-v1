
const pokemonCount = 493;
var pokedex = {}; // {1 : {"name" : "bulbasaur", "img" : url, "type" : ["grass", "poison"], "desc" : "...."} }

window.onload = async function() {
    getPokemon(1);
    for (let i = 1; i <= pokemonCount; i++) {
        await getPokemon(i);
        // <div id = "1" class="pokemon-name">BULBASAUR</div>
        let pokemon = document.createElement("div");
        pokemon.id = i;
        pokemon.innerText = i.toString() + "." + pokedex[i]["name"].toUpperCase();
        pokemon.classList.add("pokemon-names");
        pokemon.addEventListener("click", updatePokemon);
        document.getElementById("pokemon-list").append(pokemon);
    }

    console.log(pokedex);
}

async function getPokemon(num) {
  
    let url = "https://pokeapi.co/api/v2/pokemon/" + num.toString();

    let res = await fetch(url);
    let pokemon = await res.json();
    console.log(pokemon);

    let pokemonName = pokemon["name"];
    let pokemonNumber = pokemon["order"];
    let pokemonType = pokemon["types"];
    let pokemonImg = pokemon["sprites"]["front_default"];
    let pokemonHeight = pokemon["height"];
    let pokemonWeight = pokemon["weight"];

    res = await fetch(pokemon["species"]["url"])
    let pokemonDesc = await res.json();

    console.log(pokemonDesc);
    pokemonDesc = pokemonDesc["flavor_text_entries"][8]["flavor_text"]

    pokedex[num] = {"name" : pokemonName, "order": pokemonNumber, "img": pokemonImg, "types" : pokemonType, "desc" : pokemonDesc, "height" : pokemonHeight, "weight": pokemonWeight}
}

function updatePokemon() {
    document.getElementById("pokemon-img").src = pokedex[this.id]["img"];

    // update name
    document.getElementById("pokemon-name").innerText = pokedex[this.id]["name"].toUpperCase();

    // update number
    document.getElementById("pokemon-num").innerText = pokedex[this.id]["order"];

    // clear previous type
    let typesDiv = document.getElementById("pokemon-types");
    while (typesDiv.firstChild) {
        typesDiv.firstChild.remove();
    }
    // update types
    let types = pokedex[this.id]["types"];
    for(let i = 0; i < types.length; i++) {
        let type = document.createElement("span")
        type.innerText = types[i]["type"]["name"].toUpperCase();
        type.classList.add("type-box");
        type.classList.add(types[i]["type"]["name"]); // adds background color and font color
        typesDiv.append(type)
    }

    // update description
    document.getElementById("pokemon-description").innerText = pokedex[this.id]["desc"];

    // update height and weight
    document.getElementById("pokemon-height").innerText = pokedex[this.id]["height"];
    document.getElementById("pokemon-weight").innerText = pokedex[this.id]["weight"];
}