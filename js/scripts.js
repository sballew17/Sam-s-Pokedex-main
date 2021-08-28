let pokemonRepository = (function () {
let pokemonList = [];
let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
let modalContainer = document.querySelector('#modal-container');

function add(pokemon) {
  if (
    typeof pokemon === "object" &&
    "name" in pokemon &&
    "detailsUrl" in pokemon
  ) {
    pokemonList.push(pokemon);
  } else {
    ("pokemon is not correct");
  }
}


function getAll() {
  return pokemonList;
}

function addListItem(pokemon){
   let pokemonList = document.querySelector(".list-group");
  let listpokemon = document.createElement("li");
  listpokemon.classList.add('list-group-item');
  listpokemon.classList.add('list-group-item-action');
  let button = document.createElement("button");
  button.innerText = pokemon.name;
  button.classList.add("btn");
  button.classList.add('btn-block');
  button.setAttribute('data-target', '#exampleModal');
  button.setAttribute('data-toggle', 'modal');
  listpokemon.appendChild(button);
  pokemonList.appendChild(listpokemon);
  button.addEventListener('click', function(){
     showDetails(pokemon)
   })
}

function loadList() {
  return fetch(apiUrl).then(function (response) {
    return response.json();
  }).then(function (json) {
    json.results.forEach(function (item) {
      let pokemon = {
        name: item.name,
        detailsUrl: item.url
      };
      add(pokemon);
    });
  }).catch(function (e) {
    console.error(e);
  })
}

function loadDetails(item) {
   let url = item.detailsUrl;
   return fetch(url).then(function (response) {
     return response.json();
   }).then(function (details) {
     item.imageUrl = details.sprites.front_default;
     item.height = details.height;
     item.weight = details.weight;
     item.types = details.types;
   }).catch(function (e) {
     console.error(e);
   });
 }


function showDetails(pokemon) {
    loadDetails(pokemon).then(function () {
      showModal(pokemon);
    });
  }

  //Modal setup
  function showModal(pokemon){

let modalBody = $(".modal-body");
let modalTitle = $(".modal-title");
let modalHeader = $(".modal-header");

modalTitle.empty();
modalBody.empty();

let pokemonName = $("<h1>" + pokemon.name + "</h1>")
let imageElement = $('<img class="modal-img" style="width:50%">');
imageElement.attr("src", pokemon.imageUrl);
let pokemonHeight = $("<p>" + "height : " + pokemon.height + "</p>");
let pokemonWeight = $("<p>" + "weight : " + pokemon.weight + "</p>");


modalTitle.append(pokemonName);
modalBody.append(imageElement);
modalBody.append(pokemonHeight);
modalBody.append(pokemonWeight);
}

//Search in nav bar

// searchInput.addEventListener('input', function(){
//         let pokemonList = document.querySelectorAll('.list-group-item');
//         let filterValue = searchInput.value.toUpperCase();
//
//         pokemonList.forEach(function(pokemon){
//             if(pokemon.innerText.toUpperCase().indexOf(filterValue) > -1){
//                 pokemon.style.display = '';
//             }else{
//                 pokemon.style.display = 'none';
//             }
//         })
//     });


return {
  add: add,
  getAll: getAll,
  addListItem: addListItem,
  loadList: loadList,
  loadDetails: loadDetails,
  showDetails: showDetails,
  showModal: showModal

}

})();

// My forEach loop from IIFE
pokemonRepository.loadList().then(function() {
  pokemonRepository.getAll().forEach(function(pokemon){
    pokemonRepository.addListItem(pokemon);
  });
});
