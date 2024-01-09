
const pokeApi = {}

function convertPokeApiDetailToPokemon(pokeDetail) {
    const pokemon = new Pokemon()
    pokemon.number = pokeDetail.id
    pokemon.name = pokeDetail.name

    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types

    pokemon.types = types
    pokemon.type = type

    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default

    return pokemon
}

function convertPokeApiToPokemonInfo(pokeDetail, pokeSpecie) {
    const pokemonDetail = convertPokeApiDetailToPokemon(pokeDetail)
    
    const pokemonInfo = new PokemonInfo(pokemonDetail)
    pokemonInfo.height = `${(pokeDetail.height/10.0).toFixed(2)} cm`
    pokemonInfo.weight = `${pokeDetail.weight/10.0} kg`
    pokemonInfo.abilities = pokeDetail.abilities.map((ability) => ability.ability.name)
    
    const gender_rate_female = (pokeSpecie.gender_rate / 8.0)*100.0
    pokemonInfo.gender_rate_male = ` ♂ ${100.0 - gender_rate_female}%`
    pokemonInfo.gender_rate_female = `♀ ${gender_rate_female}%`

    pokemonInfo.egg_groups = pokeSpecie.egg_groups.map((egg) => egg.name)

    return pokemonInfo
}

pokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
        .then((response) => response.json())
        .then(convertPokeApiDetailToPokemon)
}

pokeApi.getPokemons = (offset = 0, limit = 5) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`

    return fetch(url)
        .then((response) => response.json())
        .then((jsonBody) => jsonBody.results)
        .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
        .then((detailRequests) => Promise.all(detailRequests))
        .then((pokemonsDetails) => pokemonsDetails)
}

pokeApi.getPokemon = (id = 1) => {
    const url1 = `https://pokeapi.co/api/v2/pokemon/${id}`
    const url2 = `https://pokeapi.co/api/v2/pokemon-species/${id}`

    return Promise.all([
            fetch(url1).then((response) => response.json()),
            fetch(url2).then((response) => response.json())
        ])
        .then((responses) => convertPokeApiToPokemonInfo(responses[0], responses[1]))
}
