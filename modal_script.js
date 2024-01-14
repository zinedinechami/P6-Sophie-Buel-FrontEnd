// récupération du button modal
const Modal_gallery_section = document.getElementById("modal_gallery");

const modal_button = document.querySelector(".js-modal");

// variable null (aucune valeur n'y est associé) par defaut permettant d'associer une target à la modal
// (ex: on pourra ensuite associer des variables target spécifique pour savoir sur quel modale les actions se produisent)
let modal = null;

// OPEN MODAL
// function afficher la modale
const openModal = function (event) {
  // bloque le comportement habtituelle du navigateur (ex: le lien modal button va servir à afficher un element)
  event.preventDefault();
  // création d'une variable récuperant l'attribut href de l'élément attaché à l'event (le query js-modal est associé à l'id #modal-1 grace au href associé au lien)
  const target = document.querySelector(event.target.getAttribute("href"));
  // on annule le display none de la modale, pour afficher la modale
  target.style.display = null;
  // on sauvgarde dans la variable modale la cible, c'est a dire la variable target récuperant l'id #modale-1
  modal = target;
  // donc lorsque qu'on clique sur la cible (la page modale), on ferme la modale
  modal.addEventListener("click", closeModal);
  // quand on clique sur le button close modal, on ferme la modale
  modal.querySelector(".modal_close").addEventListener("click", closeModal);
  // permet d'annuller la fermeture de la modale quand on clique sur le contenu de la modale
  modal.querySelector(".modal_stop").addEventListener("click", stopPropagation);
};

// HIDE MODAL
// cet function va inverser tout le processus openModal permettant de revenir au comportement normal de la page
const closeModal = function (event) {
  event.preventDefault();
  // reaffiche le display none, faisant re disapraitre la modal
  modal.style.display = "none";
  // puis on retire tout les event listeners lié à la fermeture de la modale
  modal.removeEventListener("click", closeModal);
  modal.querySelector(".modal_close").removeEventListener("click", closeModal);
  modal
    .querySelector(".modal_stop")
    .removeEventListener("click", stopPropagation);
  // enfin on remet la modale a null (retirant donc la target associé)
  modal = null;
};

// fonction prenant en parametre l'evenemnt de l'event listerner
// méthode permettant d'empecher la propagation de l'evenemnt vers les parent
const stopPropagation = function (event) {
  event.stopPropagation();
};

// event listeners du button modal
modal_button.addEventListener("click", openModal);

// OPEN NEW MODAL
// ouverture content modal ajout photo

const section_modal_gallery = document.getElementById("modal_gallery_photo");

const section_ajout_modal = document.getElementById("modal_ajout_photo");

const button_modal_ajout = document.getElementById("open_modal_ajout");

function openModalAjout() {
  section_modal_gallery.style.display = "none";
  section_ajout_modal.style.display = null;
}

button_modal_ajout.addEventListener("click", openModalAjout);

// RETURN TO MODAL
const button_modal_retour = document.querySelector(".modal_return");

function returnModal() {
  section_modal_gallery.style.display = null;
  section_ajout_modal.style.display = "none";
}

button_modal_retour.addEventListener("click", returnModal);

// MODAL AJOUT IMG PREVIEW

// const modal_input_image = document.getElementById("modal_input_img");
// let uploaded_img = "";

// modal_input_image.addEventListener("change", function () {
//   const reader = new FileReader();
//   reader.addEventListener("load", function () {
//     uploaded_img = reader.result;
//     document.querySelector(
//       "#modal_display_img"
//     ).style.backgroundImage = `url(${uploaded_img})`;
//     reader.readAsDataURL(this.files[0]);
//   });
// });
