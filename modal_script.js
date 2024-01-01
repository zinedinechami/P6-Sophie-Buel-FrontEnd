const modal_button = document.querySelector(".js-modal");

console.log(modal_button)

const openModal = function (event) {
    event.preventDefault();
    const target = document.querySelector(event.target.getAttribute('href'))
    target.style.display = null
    modal = target
    modal.addEventListener('click', closeModal)
    modal.querySelector('.modal_close').addEventListener('click', closeModal)

}

const closeModal = function(event) {
    if (modal === null) return
    event.preventDefault();
    modal.style.display = "none"
    modal.removeEventListener('click', closeModal)
    modal.querySelector('.modal_close').removeEventListener('click', closeModal)
    modal = null
}

modal_button.addEventListener('click', openModal)