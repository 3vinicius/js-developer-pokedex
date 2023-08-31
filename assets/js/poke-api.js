const pokeApi = {};

function convertPokeApiDetailToPokemon(pokeDetail) {
  const pokemon = new Pokemon();
  pokemon.number = pokeDetail.id;
  pokemon.name = pokeDetail.name;

  const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name);
  const [type] = types;

  pokemon.types = types;
  pokemon.type = type;

  pokemon.photo = pokeDetail.sprites.other.dream_world.front_default;

  //console.log(pokeDetail.stats[0].base_stat)

  pokemon.about.height = pokeDetail.height;
  pokemon.about.weight = pokeDetail.weight;
  pokemon.about.abilities = pokeDetail.abilities.map((v) => v.ability.name);

  pokemon.stats.att = pokeDetail.stats[1].base_stat;
  pokemon.stats.hp = pokeDetail.stats[0].base_stat;
  pokemon.stats.def = pokeDetail.stats[2].base_stat;
  pokemon.stats.spAttack = pokeDetail.stats[3].base_stat;
  pokemon.stats.spDef = pokeDetail.stats[4].base_stat;
  pokemon.stats.speed = pokeDetail.stats[5].base_stat;
  pokemon.stats.total = (
    pokemon.stats.att +
    pokemon.stats.hp +
    pokemon.stats.def +
    pokemon.stats.speed +
    pokemon.stats.spDef +
    pokemon.stats.spAttack) / 6;


  return pokemon;
}

pokeApi.getPokemonDetail = (pokemon) => {
  return fetch(pokemon.url)
    .then((response) => response.json())
    .then(convertPokeApiDetailToPokemon);
};

pokeApi.getPokemons = (offset = 0, limit = 5) => {
  const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;

  return fetch(url)
    .then((response) => response.json())
    .then((jsonBody) => jsonBody.results)
    .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
    .then((detailRequests) => Promise.all(detailRequests))
    .then((pokemonsDetails) => pokemonsDetails);
};
