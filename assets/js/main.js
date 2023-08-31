const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')

const maxRecords = 151
const limit = 10
let offset = 0;

function convertPokemonToLi(pokemon) {
    return `
        <li class="pokemon ${pokemon.type}">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>

                <img src="${pokemon.photo}"
                     alt="${pokemon.name}">
            </div>

            <div class="modal" id="model" hidden>
            <div class="stats">
              <ol>
                <h3>About</h3>
                <li class="infoAbout">
                  <p>Height</p>
                  <p>${pokemon.about.height}</p>
                </li>
                <li class="infoAbout">
                  <p>Weight</p>
                  <p>${pokemon.about.weight}</p>
                </li>
                <li class="infoAbout">
                  <p>Abilities</p>
                  <p>${pokemon.about.abilities[0]}, ${pokemon.about.abilities[1]}</p>
                </li>
              </ol>
              <ol>
                <h3>Base Stats</h3>
                <li>
                  <p calss="infoStats">HP</p>
                  <span class="progress-bar" style="--progress:${pokemon.stats.hp}"></span>
                </li>
                <li>
                  <p>Attack</p>
                  <span class="progress-bar" style="--progress:${pokemon.stats.att}"></span>
                </li>
                <li>
                  <p>Defense</p>
                  <span class="progress-bar" style="--progress:${pokemon.stats.def}"></span>
                </li>
                <li>
                  <p>Sp. Atk</p>
                  <span class="progress-bar" style="--progress:${pokemon.stats.spAttack}"></span>
                </li>
                <li>
                  <p>Sp. Def</p>
                  <span class="progress-bar" style="--progress:${pokemon.stats.spDef}"></span>
                </li>
                <li>
                  <p>Speed</p>
                  <span class="progress-bar" style="--progress:${pokemon.stats.speed}"></span>
                </li>
                <li>
                  <p>Total</p>
                  <span class="progress-bar" style="--progress:${pokemon.stats.total}"></span>
                </li>
              </ol>
            </div>
          </div>
        </li>
    `
}

function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join('')
        pokemonList.innerHTML += newHtml
    })
}

loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordsWithNexPage = offset + limit

    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)
    }
})