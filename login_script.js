// login variables
const loginForm = document.getElementById('login');
let loginEmail = document.getElementById('email');
let loginPassword = document.getElementById('password');
let error_message = document.getElementById("error");
// const modal_login = document.querySelector("modal_title");



// ajout d'un event listeners bouton contenant le type submit
loginForm.addEventListener('submit', function(event) {
    // habituellement le naviagateur va envoyer les info du form au serveur et se rafrachir
    // ici on va bloquer le comportement par defaut pour nous occuper nous meme de la soumission du form (pour un fetch par ex)
    event.preventDefault();
    // creation d'un objet, stockant le resultat du form qu'on va entrer grace au form inputs
    const formData = { email : loginEmail.value,
        password : loginPassword.value
    }
    // on convertis l'object formData en JSON sous forme de chargeUtile
    const chargeUtile = JSON.stringify(formData);
    // affiche le resulat du form en JSON dans la console
    console.log(chargeUtile)
    // recuperation de l'API
    fetch("http://localhost:5678/api/users/login", {
        // ici on post la reponse de ce qu'on a mit dans le form
        // method HTTP POST, permettant sous forme de verbe d'intéragir avec l'API
        // POST permet d'ici de poster le contenu des input du form de l'API afin d'obtenir une réponse
        // ici si les bon coordonnées sont données on doit recevoir un token permettant l'authentification de l'user
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: chargeUtile })
        // si le resultat souhaitée est reussi (on met les bonnes informations) on retourne les informations en JSON
        .then (function (response) {
            return response.json()
        })
        // si les informations sont retourné en JSON, on affiche les informations en JSON sous la forme du parametre data (donc l'id et le token)
        .then (function (data) {
            console.log(data)
            // si le le token est recupéré, (grace au parametre data et à la clé ".token")
            if (data.token) {
            // on récupere le token dans le storage local
            window.localStorage.setItem("token", data.token);
            console.log(data.token);
            // puis on redirige l'utilisateur vers le page principal
            window.location = "index.html"
            // add modal button
            // modal_login.innerHTML += `<a class="js-modal" href="#modal1"
            // ><i class="fa-regular fa-pen-to-square"></i>modifier</a>`
            // remove filter section
        } else {
            // si la condition n'est pas complétée on affiche un message d'erreur
            error_message.classList.replace("inactive", "active");
            console.log("error")
        }
        });
});