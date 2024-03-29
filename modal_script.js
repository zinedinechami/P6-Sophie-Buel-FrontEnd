const Modal_gallery_section = document.getElementById("modal_gallery");

const modal_button = document.querySelector(".js-modal");
let modal = null;
function openModal(event) {
  event.preventDefault();
  const target = document.querySelector(event.target.getAttribute("href"));
  target.style.display = null;
  modal = target;
  modal.addEventListener("click", closeModal);
  modal.querySelector(".modal_close").addEventListener("click", closeModal);
  modal.querySelector(".modal_stop").addEventListener("click", stopPropagation);
}
function closeModal(event) {
  event.preventDefault();
  modal.style.display = "none";
  modal.removeEventListener("click", closeModal);
  modal.querySelector(".modal_close").removeEventListener("click", closeModal);
  modal
    .querySelector(".modal_stop")
    .removeEventListener("click", stopPropagation);
  modal = null;
}
function stopPropagation(event) {
  event.stopPropagation();
}
modal_button.addEventListener("click", openModal);

const section_modal_gallery = document.getElementById("modal_gallery_photo");
const section_ajout_modal = document.getElementById("modal_ajout_photo");
const button_modal_ajout = document.getElementById("open_modal_ajout");
const button_modal_retour = document.querySelector(".modal_return");
function openModalAjout() {
  section_modal_gallery.style.display = "none";
  section_ajout_modal.style.display = null;
}
function returnModal() {
  section_modal_gallery.style.display = null;
  section_ajout_modal.style.display = "none";
}
button_modal_ajout.addEventListener("click", openModalAjout);
button_modal_retour.addEventListener("click", returnModal);

let fileInput = document.getElementById("modal_input_img");
function showModalImage() {
  let file = fileInput.files[0];
  if (file) {
    let reader = new FileReader();
    reader.onload = function (event) {
      let img = document.createElement("img");
      img.src = event.target.result;
      let resultDiv = document.getElementById("modal_display_img");
      resultDiv.appendChild(img);
      let hideContent = document.getElementById("modal_img_hide");
      hideContent.style.display = "none";
    };
    reader.readAsDataURL(file);
  }
}
fileInput.addEventListener("change", showModalImage);

const modal_form = document.getElementById("modal_form");
const modal_input_image = document.getElementById("modal_input_img");
const modal_input_title = document.getElementById("modal_input_title");
const modal_input_category = document.getElementById("modal_input_categories");
const modal_add_message = document.getElementById("added");

modal_form.addEventListener("submit", function (event) {
  event.preventDefault();
  const modalFormData = new FormData();
  modalFormData.append("image", modal_input_image.files[0]);
  modalFormData.append("title", modal_input_title.value);
  modalFormData.append("category", modal_input_category.value);
  fetch(api_url + "works", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      accept: "application/json",
      ContentType: "multipart/form-data",
    },
    body: modalFormData,
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      gallery_section.innerHTML += `<figure id="delete" data-${data.categoryId} class="active">
        <img src="${data.imageUrl}" alt="${data.title}">
        <figcaption>${data.title}</figcaption>
    </figure>`;
      Modal_gallery_section.innerHTML += `<article>
        <img src="${data.imageUrl}" alt="${data.title}" />
        <span id="${data.id}" class="modal_delete_icon">
        <i class="fa-solid fa-trash-can"></i> 
      </span>
      </article>`;
      modal_add_message.classList.replace("inactive", "active");
      return deleteWorks();
    });
});
