// GET WORKS
const api_url = "http://localhost:5678/api/";

const gallery_section = document.getElementById("gallery");

// fonction recupereant les informations de l'API, les traitent en format JSON, puis integre les informations lié au travaux au dom dynammiqement
function getWorks() {
  fetch(api_url + "works")
    // retourne la promese avec la methode "then()"
    // si elle est reussi on met en place une fonction anonyme(on peut aussi utiliser des fonctions fléchées à la place) qui retourne la réponse en JSON avec la méthode ".json ()
    .then(function (response) {
      return response.json();
    })
    // retourne la promese avec la methode "then()"
    // si les informations sont retourné en JSON, on met en pace une fonction anonyme qui permet d'utiliser le parametre data pour representer la valeur de la promese (donc la réponse en JSON)
    .then(function (data) {
      // ceci sert a retourner les info JSON representé par data dans la console afin d'observer les objets qu'on va intégerer dans le DOM par la suite
      console.log(data);
      // for in loop, qui itere à travers les propriétés des objets représenté par le parametre "data"
      // "work" est une variable de la boucle, qui premet d'extraire la valeur souhaitée à partir du nom de la propriété depuis les objets "data"
      for (let work in data) {
        // creation de data set se referant au categoryId dans l'API, se refereant au nom des Id des filtres
        gallery_section.innerHTML += `<figure id="delete" data-${data[work].categoryId} class="active">
        <img src="${data[work].imageUrl}" alt="${data[work].title}">
        <figcaption>${data[work].title}</figcaption>
    </figure>`;
      }
      for (let work in data) {
        Modal_gallery_section.innerHTML += `<article>
        <img src="${data[work].imageUrl}" alt="${data[work].title}" />
        <span id="${data[work].id}" class="modal_delete_icon">
        <i class="fa-solid fa-trash-can"></i> 
      </span>
      </article>`;
      }
      return deleteWorks();
    });
}
getWorks();

// DELETE WORKS
// fonction delete works qui se lancent apres la récuperation des works
function deleteWorks() {
  // on recupere tout les icones poubelles
  const modal_delete = document.querySelectorAll(".modal_delete_icon");
  console.log(modal_delete);

  // puis on boucle sur toutes les poubelles avec le param suppresion
  for (let suppresion of modal_delete) {
    // on y ajoute des event listeners qui opere une function au clic
    suppresion.addEventListener("click", function (event) {
      event.preventDefault();
      // on récupere les id des poubelles qui correspondent au id des works
      const id = suppresion.id;

      // on recupere tout les elements contenant l'affichage des works pour une suppresion sans refresh
      // const figureElement = event.target.closest("figure");
      const articleElement = event.target.closest("article");
      const figureElement = document.getElementById("delete");
      console.log(figureElement);

      // on appelle l'api works contenant la valeur de l'id de la poubelle sur lequel on a cliqué
      fetch(api_url + "works/" + id, {
        // on fait passer la methode delete pour supprimer les elements associé a l'id choisi
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      }).then(function (response) {
        console.log(response);
        if (response.ok) {
          articleElement.remove();
          figureElement.remove();
        }
      });
    });
  }
}

// GET CATEGORIES
// recuperation des categories depuis l'API
const category_section = document.getElementById("filters");

fetch(api_url + "categories")
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(data);
    for (let category in data) {
      // category_section.innerHTML += `<button id="${data[category].id}">${data[category].name}</button>`
      let filterButton = document.createElement("button");
      filterButton.innerHTML = `${data[category].name}`;
      filterButton.id = `${data[category].id}`;
      category_section.appendChild(filterButton);
    }
    return showFilters();
  });

// SHOW WORKS BY FILTER
// fonction permettant le fonctionnement des boutons filtres, se referant au data-sets des figures, qui sont récupéres dans la fonction GetWorks
function showFilters() {
  // on récupere tout les buttons filtres
  let filters = document.querySelectorAll("#filters button");
  console.log(filters);
  // je boucle sur les boutons, je crée une variable pour la boucle "filtres" permettant d'ajouter un event listener sur chanque bouton
  for (let filter of filters) {
    filter.addEventListener("click", function () {
      // grace à "this" je récupere le id de chaque bouton filtres
      let tag = this.id;
      console.log(tag);

      // recupere tout les balises contenant les images
      let travaux = document.querySelectorAll("#gallery figure");

      // for loop, on boucle sur chacun des travaux pour activer les travaux corréspondant au tag, et desactivter les travaux non concernés
      // "travail" est une variable de la boucle, qui premet d'extraire la valeur souhaitée à partir des informations tirée de la variable travaix
      for (let travail of travaux) {
        // d'abord on rend tout les travaux invisible au click de l'event listeners pour activer que les travaux concernées ensuite
        travail.classList.replace("active", "inactive");
        // si le tag est present dans le data set présent dans les balises figure on va rendre les travaux concernés visible (remplacer inactive par active)
        // operateur OR, si tag est égal au ID "all" on met toute les images en active
        // (le ID all ne correspond a aucun dataset trouvé dans les travaux, nous devons le prendre a part pour appliquer le classe active sur tout les balises figure)
        if (tag in travail.dataset || tag === "all") {
          travail.classList.replace("inactive", "active");
        }
      }
    });
  }
}

// GET TOKEN FOR WORKS MODIFICATION
// affichage des elements nécassaire aprés l'authentification user
const token = window.sessionStorage.getItem("token");
console.log(token);

const modal_nav = document.getElementById("modal_nav");
console.log(modal_nav);

if (token) {
  const modal_section = document.getElementById("insert_modal");
  console.log(modal_section);
  modal_section.innerHTML += `<a class="js-modal" href="#modal1"><i class="fa-regular fa-pen-to-square"></i>modifier</a>`;
  category_section.style.display = "none";
  modal_nav.style.display = null;
}

// ADD WORKS
// récuperation des inputs pour l'ajout des works
const modal_form = document.getElementById("modal_form");

const modal_input_image = document.getElementById("modal_input_img");
console.log(modal_input_image);

const modal_input_title = document.getElementById("modal_input_title");

const modal_input_categories = document.getElementById(
  "modal_input_categories"
);

// event listener bouton submit du form
modal_form.addEventListener("submit", function (event) {
  event.preventDefault();

  // récuperation des valeur et des clés des inputs du form
  // const modalFormData = {
  //   image: modal_input_image.value,
  //   title: modal_input_title.value,
  //   category: modal_input_categories.value,
  // };

  // on convertit l'objet en json pour interagir avec l'API
  // const modalChargeUtile = JSON.stringify(modalFormData);

  // variable qui recupere les valeur des clés et des inputs grace a la methode FormData
  const modalFormData = new FormData();
  console.log(modalFormData);

  modalFormData.append("image", modal_input_image.files[0]);
  modalFormData.append("title", modal_input_title.value);
  modalFormData.append("category", modal_input_categories.value);

  console.log(modal_input_categories.value);
  console.log("etape 3", modal_input_image.files[0]);

  // on boucle sur la variable avec le param item, permettant de voir dans la console le contenu des inputs
  for (item of modalFormData) {
    console.log(item[0], item[1]);
  }

  // recupération de l'API
  fetch(api_url + "works", {
    // methode post pout poster le contenu du forms recupéré avant
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      accept: "application/json",
      ContentType: "multipart/form-data",
    },
    body: modalFormData,
  })
    // si les bons inputs sont rentrée on retourne les informations en json
    .then(function (response) {
      return response.json();
    })
    // et si les info en JSON sont retournée on retourne ses info sous le param data, permettant de visualiser les info
    .then(function (data) {
      console.log(data);
      return getWorks;
    });
});
