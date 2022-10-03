const pokeApi = (id) => {
    return fetch('https://pokeapi.co/api/v2/pokemon/' + id)
}


const getAllPokemons = async (quantity) => {
    const promises = [];
    for (let i = 1; i <= quantity; i++) {
        promises.push(pokeApi(i))
    }

    const data = await Promise.all(promises);

    const responses = data.map((res) => {
        return res.json()
    })
    
    const pokemons = await Promise.all(responses)
    // console.log(pokemons)
    return pokemons
}

const search = document.querySelector('#search');
search.addEventListener('keyup', () => {
    console.log(search.value)
})

window.addEventListener('load', async () => {

    const pokemons = await getAllPokemons(151);

    const container =  document.querySelector('#pokemons');
    let html = ''
    for (let i = 0; i < pokemons.length; i++) {
        const element = pokemons[i];
        html += `
        <a class="panel-block is-active">
            <figure class="image is-48x48">
                <img src="${element.sprites.front_default}">
            </figure>
        <span class="is-capitalized has-text-weight-semibold	">${element.name}</span>
        </a>`
    }
    container.innerHTML = html
    //console.log(pokemons);
    
    const input = document.querySelector('input')

    input.addEventListener('keyup', () => {

    const pokemonFilter = pokemons.filter((pokemon) => {
        if (pokemon.name.toLowerCase().includes(input.value.toLowerCase()))
        return true
    })
        
    let html = '';
        
    for (let i = 0; i < pokemonFilter.length; i++) {
        html += `<div class='panel-block'>`+
            `<figure class="image is-48x48"><img src='${pokemonFilter[i].sprites.front_default}'></figure>`+
            ` <span class='name is-capitalized has-text-weight-semibold'>${pokemonFilter[i].name}</span></div>`;
            
    }
        
        container.innerHTML = html
    })
})


/*const pokeApi = (id) => {
    return fetch('https://pokeapi.co/api/v2/pokemon/' + id)
}
const getAllPokemons = async (quantity) =>{
    const promises = [];
    for (let i = 0; i <= quantity; i++) {
        promises.push(pokeApi(i))
    }
    const data = await Promise.all(promises);
    //console.log(data)
    const responses = data.map((response) => {
        return response.json()
    })
    //console.log(responses)
    const pokemons = await Promise.all(responses);
    //console.log(pokemon)
    return pokemons;
}


window.addEventListener('load', async() =>{
    let container = document.querySelector('#pokemons');
    let html = '';
    container.innerHTML = " "

    const pokemons = await getAllPokemons(151);
    
    for (let i = 0; i < pokemons.length; i++) {
            html += `<div class='panel-block'>`+
            `<figure class="image is-48x48"><img src='${pokemons[i].sprites.front_default}'></figure>`+
            ` <span class='name is-capitalized has-text-weight-semibold'>${pokemons[i].name}</span></div>`;
    }

    container.innerHTML = html;

    let input = document.getElementById('search')
    input.addEventListener('keyup', (e)=>{
        const pokemonFilter = pokemons.filter( (pokemon) => {
            if(pokemon.name.toLowerCase().includes(input.value.toLowerCase()))
                return true;
        })
        let html = ''

        for (let i = 0; i < pokemonFilter.length; i++) {
            html += `<div class='panel-block'>`+
            `<figure class="image is-48x48"><img src='${pokemonFilter[i].sprites.front_default}'></figure>`+
            ` <span class='name is-capitalized has-text-weight-semibold'>${pokemonFilter[i].name}</span></div>`;
            
        }

        
     container.innerHTML = html;
    })   
})
/*
//vars
let container = document.querySelector('#pokemons');
let html = '';
container.innerHTML = " "
const pokemons = [];

//1
const getData = async (arg) =>{
    for (let i = 1; i <= 151; i++) {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon/' +i);
        const data = await response.json();
        pokemons.push(data)
    }
}

const PokeApi = (id) =>{
    return fetch('https://pokeapi.co/api/v2/pokemon/' + id)
}



window.addEventListener('load', async() =>{
    const pokemons = await getData();
    
    for (let i = 0; i < pokemons.length; i++) {
            html += `<div class='panel-block'>`+
            `<figure class="image is-48x48"><img src='${pokemons[i].sprites.front_default}'></figure>`+
            ` <span class='name is-capitalized has-text-weight-semibold'>${pokemons[i].name}</span></div>`;
    }

    container.innerHTML = html;
})


*/

/*const getData = fetch('https://pokeapi.co/api/v2/pokemon/?limit=151')
.then( (response) => response.json()
.then( async (res) => {
    let pokemon = await res.results.map((pokemon)=> {
        getPokemon(pokemon.url);
        return pokemon;
    })
    console.log(pokemon)
}));*/



