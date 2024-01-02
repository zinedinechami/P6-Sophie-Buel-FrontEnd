//  variables
const api_url = 'http://localhost:5678/api';

const gallery_section = document.getElementById("gallery");

// fonction recupereant les informations de l'API, les traitent en format JSON, puis integre les informations lié au travaux au dom dynammiqement
function getWorks (){
fetch (api_url + "/works")
    // retourne la promese avec la methode "then()"
    // si elle est reussi on met en place une fonction anonyme(on peut aussi utiliser des fonctions fléchées à la place) qui retourne la réponse en JSON avec la méthode ".json ()
    .then (function (response) {
        return response.json ()
    })
    // retourne la promese avec la methode "then()"
    // si les informations sont retourné en JSON, on met en pace une fonction anonyme qui permet d'utiliser le parametre data pour representer la valeur de la promese (donc la réponse en JSON)
    .then(function (data) {
        // ceci sert a retourner les info JSON representé par data dans la console afin d'observer les objets qu'on va intégerer dans le DOM par la suite
        console.log(data)
        // for in loop, qui itere à travers les propriétés des objets représenté par le parametre "data"
        // "work" est une variable de la boucle, qui premet d'extraire la valeur souhaitée à partir du nom de la propriété depuis les objets "data"
        for (let work in data) { 
            // creation de data set se referant au categoryId dans l'API, se refereant au nom des Id des filtres
        gallery_section.innerHTML += `<figure data-${data[work].categoryId} class="active">
        <img src="${data[work].imageUrl}" alt="${data[work].title}">
        <figcaption>${data[work].title}</figcaption>
    </figure>`
    }
    } )
} ;

// permet de lancer la fonction écrite aupart avant
getWorks();



const category_section = document.getElementById("filters");

function getCategories (){
    fetch (api_url + "/categories")
        .then (function (response) {
            return response.json ()
        })
        .then(function (data) {
            console.log(data)
            for (let category in data) { 
            // category_section.innerHTML += `<button id="${data[category].id}">${data[category].name}</button>`
            let filterButton = document.createElement('button')
            filterButton.innerHTML = `${data[category].name}`
            filterButton.id = `${data[category].id}`
            category_section.appendChild(filterButton)
        }
        return showFilters();
        } )
    } ;

getCategories();



// fonction permettant le fonctionnement des boutons filtres, se referant au data-sets des figures, qui sont récupéres dans la fonction GetWorks
function showFilters () {
    // on récupere tout les buttons filtres
    let filters = document.querySelectorAll("#filters button");
    console.log(filters)
    // je boucle sur les boutons, je crée une variable pour la boucle "filtres" permettant d'ajouter un event listener sur chanque bouton
    for(let filter of filters ){
        filter.addEventListener("click", function(){
            // grace à "this" je récupere le id de chaque bouton filtres
            let tag = this.id;
            console.log(tag);

            // recupere tout les balises contenant les images
            let travaux = document.querySelectorAll("#gallery figure");

            // for loop, on boucle sur chacun des travaux pour activer les travaux corréspondant au tag, et desactivter les travaux non concernés 
            // "travail" est une variable de la boucle, qui premet d'extraire la valeur souhaitée à partir des informations tirée de la variable travaix
            for (let travail of travaux){
                // d'abord on rend tout les travaux invisible au click de l'event listeners pour activer que les travaux concernées ensuite
                travail.classList.replace("active", "inactive");
                // si le tag est present dans le data set présent dans les balises figure on va rendre les travaux concernés visible (remplacer inactive par active)
                // operateur OR, si tag est égal au ID "all" on met toute les images en active
                // (le ID all ne correspond a aucun dataset trouvé dans les travaux, nous devons le prendre a part pour appliquer le classe active sur tout les balises figure)
                if(tag in travail.dataset || tag === "all"){
                    travail.classList.replace("inactive", "active");
                }

            }
        });
    }

};
    
