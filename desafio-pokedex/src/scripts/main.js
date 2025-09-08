
const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')
const limit = 12
let offset = 0;


function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map((pokemon) => {
            const numberFormat = pokemon.number.toString().padStart(3, '0');
            const height = (pokemon.height / 10);
            const weight = (pokemon.weight / 10);
            return `
            <li class="card">
                <div class="card-inner"> 
                    <div class="pokemon ${pokemon.type} front-side card-front hover-underline">
                        <span class="number">#${numberFormat}</span>
                        <span class="name">${pokemon.name}</span>

                        <div class="detail">
                            <ol class="types">
                                ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                            </ol>

                           <img src="https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/detail/${numberFormat}.png" 
                                alt="${pokemon.name}">
                        </div>
                    </div>
                    <div class="pokemon ${pokemon.type} back-side card-back hover-underline">
                        <span class="number">${numberFormat}</span>
                        <span class="name">${pokemon.name}</span>
                        <div class="detail">
                            <div class="types-container">
                                <ol class="types">
                                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                                </ol>
                            </div>
                            <img src="https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/detail/${numberFormat}.png"
                                alt="${pokemon.name}">
                            

                            <div class="atributos">
                               <ul class="column-1">
                                    <li class="atributo">
                                       <span class="atributo-label">Height:</span>
                                       <span class="atributo-valor">${height} m</span>
                                    </li>
                                    <li class="atributo">
                                        <span class="atributo-label">Weigh:</span>
                                        <span class="atributo-valor">${weight} kg</span>
                                    </li>
                                </ul>
                                <ul class="column-2">
                                    <li class="atributo">
                                        <span class="atributo-label">Abilities:</span>
                                        <span class="atributo-valor">
                                        <ol class="abilities">
                                            ${pokemon.abilities.slice(0, 2).map((ability) => {
                                                const formatted = ability.replace(/-/g, ' '); 
                                                return`<li class="ability">${formatted}</li>`}).join('')}
                                        </ol></span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </li>

            `
        }).join('')
        pokemonList.innerHTML += newHtml
        document.querySelectorAll('.card').forEach(card => {
            card.addEventListener('click', () => {
                card.classList.toggle('is-flipped');
            });
        });
    })
}

loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit
    loadPokemonItens(offset, limit)
})

