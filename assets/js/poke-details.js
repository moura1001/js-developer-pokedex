const content = document.getElementById('content')
const pokemonDetails = document.getElementById('details')
const pokemonInfo = document.getElementById('info')
const params = (new URL(document.location)).searchParams
const id = params.get("id")

const pokemon = pokeApi.getPokemon(id)
console.log(id)

function buildPokemonDetails(poke) {
    return `
		<h1>${poke.name}</h1>
        <span class="number">#${poke.number}</span>
        <ol class="types">
            ${poke.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
        </ol>

        <img src="${poke.photo}"
            alt="${poke.name}">
    `
}

function buildPokemonInfo(poke) {
    return `
        <h3>About</h3>
        <p>
            <span class="infoTag">Height</span>
            <span class="infoValue">${poke.height}</span>
        </p>
        <p>
            <span class="infoTag">Weight</span>
            <span class="infoValue">${poke.weight}</span>
        </p>
        <p>
            <span class="infoTag">Abilities</span>
            <span class="infoValue">${poke.abilities.join(', ')}</span>
        </p>
        <h3>Breeding</h3>
        <p>
            <span class="infoTag">Gender</span>
            <div id="genderRate">
                <span>${poke.gender_rate_male}</span>
                <span>${poke.gender_rate_female}</span>
            </div>
        </p>
        <p>
            <span class="infoTag">Egg Groups</span>
            <span class="infoValue">${poke.egg_groups.join(', ')}</span>
        </p>
    `
}

pokemon.then((poke) => {
    content.classList.add(poke.type)
    pokemonDetails.innerHTML = buildPokemonDetails(poke)
    pokemonInfo.innerHTML = buildPokemonInfo(poke)
})
