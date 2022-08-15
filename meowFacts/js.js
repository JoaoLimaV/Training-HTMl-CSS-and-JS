const valuesAPI = {
    'text-fact': '',
    'image-cat': '',
}
const activeDiv = {
    enableElementAPI : (value) => { if(value == true){ elementAPI.style.display = 'flex'} else{ elementAPI.style.display = 'none' } },
    enabledivLoading : (value) => { if(value == true){ divLoading.style.display = 'flex'} else{ divLoading.style.display = 'none' } }
}
const elementAPI = document.querySelector('#element')
const divLoading = document.querySelector('#loading')

const factCat = document.querySelector('#fact')
const imageCat = document.querySelector('#imageCat')
const btnRandom = document.querySelector('#randomFact')

async function responseAPI() {
    activeDiv.enableElementAPI(false);
    activeDiv.enabledivLoading(true);

    await fetch('https://meowfacts.herokuapp.com/')
        .then((dataJson) => {
            return (dataJson.json())
        })
        .then((dataJson) => {
            valuesAPI['text-fact'] = dataJson['data'][0]
        })
        .catch((err) => {
            console.log(err)
        })

    await fetch('https://api.thecatapi.com/v1/images/search')
        .then((dataJson) => {
            return (dataJson.json())
        })
        .then((dataJson) => {
            valuesAPI['image-cat'] = dataJson[0]['url']
        })
        .catch((err) => {
            console.log(err)
        })

        factCat.innerHTML = valuesAPI['text-fact'];
        imageCat.src = valuesAPI['image-cat'] 

        setTimeout( () => {
            activeDiv.enabledivLoading(false);
            activeDiv.enableElementAPI(true);
        }, 1500)
}

btnRandom.addEventListener('click',(event) => {
    /* console.log(event) */
    responseAPI();
})

