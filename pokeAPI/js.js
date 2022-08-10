
const inputSearch = document.querySelector('#input-name-pokemon')
const form = document.querySelector('#form')
const divPokedex = document.querySelector('#pokedex')
const divLoading = document.querySelector('#loading-search')

const pokemonImage = document.querySelector('.image-pokemon')
const pokemonName = document.querySelector('#name-pokemon')
const pokemonType = document.querySelector('#type-pokemon')
const radioButton = document.querySelector('#radioButton')

const fetchPokemon = async (pokemon) => {
  const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
  if (APIResponse.status == 200) {
    const data = await APIResponse.json();
    return data; 
  }
}

const renderPokemon = async (pokemon, shiny) => {
    divLoading.style.display = 'inherit'
    const data = await fetchPokemon(pokemon)

    if(divPokedex.style.display != 'flex'){ divPokedex.style.display = 'flex'}

    if( data ) {
      pokemonName.innerHTML = data.name;
      pokemonType.innerHTML = `Type: ${data['types'][0]['type']['name']} <br> Id: ${data.id}`;
      switch(shiny){
        case false:
          pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];    
        break;
        case true:
          pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_shiny'];
        break;
      }
    }else {
      pokemonName.innerHTML = '';
      pokemonType.innerHTML = 'Not Found Pokemon';
      pokemonImage.src = 'https://cdn-icons-png.flaticon.com/512/103/103085.png';
    }
    setTimeout(function(){
      divLoading.style.display = 'none'
    }, 2500);//1.5 second
    
}

form.addEventListener('submit', (event) =>{
  event.preventDefault();
  renderPokemon(inputSearch.value.toLowerCase(), radioButton.checked);
});