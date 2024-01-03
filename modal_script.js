const modal_button = document.querySelector(".js-modal");

console.log(modal_button)

const openModal = function (event) {
    event.preventDefault();
    const target = document.querySelector(event.target.getAttribute('href'))
    target.style.display = null
    modal = target
    modal.addEventListener('click', closeModal)
    modal.querySelector('.modal_close').addEventListener('click', closeModal)
    modal.querySelector('.modal_stop').addEventListener('click', stopPropagation)
}

const closeModal = function(event) {
    if (modal === null) return
    event.preventDefault();
    modal.style.display = "none"
    modal.removeEventListener('click', closeModal)
    modal.querySelector('.modal_close').removeEventListener('click', closeModal)
    modal.querySelector('.modal_stop').removeEventListener('click', stopPropagation)
    modal = null
}

const stopPropagation = function (event) {
    event.stopPropagation()
}

modal_button.addEventListener('click', openModal)





const Modal_gallery_section = document.getElementById('modal_gallery');

function getWorksModal (){
    fetch (api_url + "/works")
        .then (function (response) {
            return response.json ()
        })
        .then(function (data) {
            console.log(data)
            for (let work in data) { 
            Modal_gallery_section.innerHTML += `<article>
            <img src="${data[work].imageUrl}" alt="${data[work].title}" />
          </article>`
        }
        } )
    } ;

getWorksModal();