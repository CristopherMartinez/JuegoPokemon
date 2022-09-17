const pokemonsCont = 6;


for(i = 1; i<=pokemonsCont; i++){
    let id = obtenerRandomNum(150);
    searchPokemon(id);
}



let pokemonSearched = [];
//Arreglo de nombres de pokemones
let pokemonNames = [];
let dragElements = document.querySelector('.drag-elements');
let dropElements = document.querySelector('.drop-elements');

async function searchPokemon(id){
//Obtenemos pokemones de API
const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`)
const data = await res.json();
pokemonSearched.push(data);
pokemonNames.push(data.name);

pokemonNames = pokemonNames.sort(() => Math.random() - 0.5);

//Inicializamos en vacio
dragElements.innerHTML = '';
//Se Traen de la API los pokemones y se insertan
pokemonSearched.forEach(pokemon =>{
    dragElements.innerHTML +=  `
    <div class="pokemon">
         <img id="${pokemon.name}" draggable="true" class="image" src="${pokemon.sprites.other['official-artwork']['front_default']}" alt="pokemon">
    </div>`
})

dropElements.innerHTML = '';
//Se Traen de la API los nombres y se pintan
pokemonNames.forEach(names =>{
    dropElements.innerHTML +=  `
    <div class="names">
       <p>${names}</p>
    </div>`
})

let pokemons = document.querySelectorAll('.image');
pokemons = [...pokemons];
// console.log(pokemons);

pokemons.forEach(pokemon => {
    pokemon.addEventListener('dragstart', event=>{
        event.dataTransfer.setData('text', event.target.id);
    })
})

let mensaje = document.querySelector('.mensaje');
let names = document.querySelectorAll('.names');
let cont = 0;
names = [...names]
names.forEach(name => {
    name.addEventListener('dragover', event=>{
        event.preventDefault();


    })


    name.addEventListener('drop', event=>{
        const DataTransferida = event.dataTransfer.getData('text');
        console.log(DataTransferida);
        let pokemon = document.querySelector(`#${DataTransferida}`)
        console.log(pokemon);

        if(event.target.innerText == DataTransferida){
            console.log("True");
            cont++;
            mensaje.innerText = ''
            event.target.innerText = '';
            event.target.appendChild(pokemon);
            console.log(cont);
            if(cont == pokemonsCont){
                dragElements.innerHTML = `<div class="ganador">Ganaste!!</div>`
            }

        }else{
            console.log("False");
            mensaje.innerText = 'Incorrecto!!'
        }
    })
    
})






}


function obtenerRandomNum(max){
    return Math.floor(Math.random()*max)+1
}





