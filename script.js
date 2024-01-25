const api_url = "http://localhost:5678/api/";

const gallery_section = document.getElementById("gallery");
fetch(api_url + "works")
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    for (let work in data) {
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

function deleteWorks() {
  const modal_delete = document.querySelectorAll(".modal_delete_icon");

  for (let suppresion of modal_delete) {
    suppresion.addEventListener("click", function (event) {
      event.preventDefault();

      const id = suppresion.id;
      const articleElement = event.target.closest("article");
      const figureElement = document.getElementById("delete");
      const parent = figureElement.parentNode;

      fetch(api_url + "works/" + id, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      }).then(function () {
        articleElement.remove();
        parent.removeChild(figureElement);
      });
    });
  }
}

const category_section = document.getElementById("filters");
const modal_category_section = document.getElementById(
  "modal_input_categories"
);
fetch(api_url + "categories")
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    for (let category in data) {
      let filterButton = document.createElement("button");
      filterButton.innerHTML = `${data[category].name}`;
      filterButton.id = `${data[category].id}`;
      category_section.appendChild(filterButton);
    }
    for (let category in data) {
      modal_category_section.innerHTML += `<option value="${data[category].id}">${data[category].name}</option>`;
    }
    return showFilters();
  });

function showFilters() {
  let filters = document.querySelectorAll("#filters button");

  for (let filter of filters) {
    filter.addEventListener("click", function () {
      let tag = this.id;
      let travaux = document.querySelectorAll("#gallery figure");
      for (let travail of travaux) {
        travail.classList.replace("active", "inactive");
        if (tag in travail.dataset || tag === "all") {
          travail.classList.replace("inactive", "active");
        }
      }
    });
  }
}

const token = window.sessionStorage.getItem("token");
const modal_nav = document.getElementById("modal_nav");

if (token) {
  const modal_section = document.getElementById("insert_modal");
  modal_section.innerHTML += `<a class="js-modal" href="#modal1"><i class="fa-regular fa-pen-to-square"></i>modifier</a>`;
  category_section.style.display = "none";
  modal_nav.style.display = null;
}
