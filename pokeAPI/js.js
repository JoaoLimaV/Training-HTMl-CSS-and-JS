clearVariableStatsId = () => {
  defaultValue = ['HP: ', 'Attack: ', 'Defense: ', 'Special-attack: ', 'Special-defense: ', 'Speed: ', 'Poke ID: ' ]
  for(let key in pokemonStats){
    /*  pokemonStats[key]['outerText'].substring(0, pokemonStats[key]['outerText'].search(':') + 1); */
    pokemonStats[key].innerHTML = defaultValue[key];
  }
  pokemonId.innerHTML = defaultValue[6];
}
//Functions
const setFront = {
      setName  : function (namePoke)  { pokemonName.innerHTML = namePoke },
      setType  : function (typePoke)  { pokemonType.innerHTML = typePoke},
      setImage : function (imagePoke) { pokemonImage.src = imagePoke},
      setStats : function (key, stats) { pokemonStats[key].innerHTML += stats},
      setId    : function (idPoke) { pokemonId.innerHTML += idPoke}
}
const activeDiv = {
  activeLoading  : function (value)  { if(value == true) {  divLoading.style.display = 'inherit'; } else { divLoading.style.display = 'none'; }  },
  activePokedex  : function (value)  { if(value == true) {  divPokedex.style.display = 'flex' } else { divPokedex.style.display = 'none' } },
  activeDiv2     : function (value)  { if(value == true) {  divContainer2.style.display = 'flex'} else { divContainer2.style.display = 'none'} },
}

// Divs & Forms
const form = document.querySelector('#form')
const divPokedex = document.querySelector('#pokedex')
const divLoading = document.querySelector('#loading-search')
const divContainer2 = document.querySelector('#pokedex-container2')

// Button And inputs  
const inputSearch = document.querySelector('#input-name-pokemon')
const radioButton = document.querySelector('#radioButton')
const buttonMoreInfo = document.querySelector('#btn-more-info')

//Elements By API
const pokemonImage = document.querySelector('.image-pokemon')
const pokemonName = document.querySelector('#name-pokemon')
const pokemonType = document.querySelector('#type-pokemon')
const pokemonStats = document.getElementsByClassName('stats')
const pokemonId = document.querySelector('#id-poke')

const fetchPokemon = async (pokemon) => {
  const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
  if (APIResponse.status == 200) {
    const data = await APIResponse.json();
    return data; 
  }
}

const renderPokemon = async (pokemon, shiny) => {
    activeDiv.activeLoading(true);
    const data = await fetchPokemon(pokemon)
    activeDiv.activePokedex(true);
    /* console.log(data); */

    if( data ) {
      // Desconstruindo a API [Name]
      let { name : namePoke } = data;
      setFront.setName(namePoke);

      // Desconstruindo a API [Type]
      let { types: [ ...restTypes]} = data;

      let typePoke = ''; 

      for(let key in restTypes){
        typePoke += restTypes[key].type.name + ' ';
      }
      setFront.setType(typePoke);
      
      // Desconstruindo a API [Sprite] 
      
      // Pokemons with IS bigger 600, does not exist animated sprite for he.

      if(data.id >= 650){
        if(shiny == true){
          var {sprites: { ['front_default'] : imagePoke } } = data;
        }else{
          var {sprites: { ['front_shiny'] : imagePoke } } = data;
        }
      }else{
        if(shiny == true){
          var {sprites: { versions: { ['generation-v'] :  { ['black-white'] : { animated: { ['front_shiny'] : imagePoke } } } } } } = data;
        }else{
          var {sprites: { versions: { ['generation-v'] :  { ['black-white'] : { animated: { ['front_default'] : imagePoke } } } } } } = data;
        }
      }
      setFront.setImage(imagePoke);

      // Clear The tags HTML P.stats and IDPoke 
      clearVariableStatsId(); 

      // Desconstruindo a API [Stats]
      let { stats: [...restStats] } = data;

      for(let key in restStats){
        setFront.setStats(key, restStats[key]['base_stat']);
      }

      // Desconstruindo a API [ID]
      let { id : idPoke } = data;
      setFront.setId(idPoke);
     
    }else {
      setFront.setName('');
      setFront.setType('Not Found');
      setFront.setImage('https://cdn-icons-png.flaticon.com/512/103/103085.png');
    }
    activeDiv.activeLoading(false);
}

form.addEventListener('submit', (event) =>{
  event.preventDefault();
  renderPokemon(inputSearch.value.toLowerCase(), radioButton.checked);
});

buttonMoreInfo.addEventListener('click', (event) =>{
  if(divContainer2.style.display == 'flex'){ activeDiv.activeDiv2(false); } else { activeDiv.activeDiv2(true); }
  if(buttonMoreInfo.classList.contains('rotate180deg')){ buttonMoreInfo.classList.remove('rotate180deg'); } else { buttonMoreInfo.classList.add('rotate180deg'); }
});

