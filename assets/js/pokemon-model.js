
class Pokemon {
    number;
    name;
    type;
    types = [];
    photo;

    constructor(number, name, type, types, photo) {
        this.number = number
        this.name = name
        this.type = type
        this.types = types
        this.photo = photo
    }
}

class PokemonInfo extends Pokemon {
    height;
    weight;
    abilities = [];
    gender_rate_male;
    gender_rate_female;
    egg_groups = [];

    constructor(pokemon) {
        super(pokemon.number, pokemon.name, pokemon.type, pokemon.types, pokemon.photo)
    }
}
