// LOGIN POST
// Je recupere les inputs du form de la page login,
// puis post le resultat inputs transformée au format JSON à l'API pour ainsi récuperer un token si les bons identifiants sont entrées
// si le token est récupéré je suis redirigée a la page principale et j'ai accées au fonctionalitée de modification.
const loginForm = document.getElementById("login");
let loginEmail = document.getElementById("email");
let loginPassword = document.getElementById("password");
let error_message = document.getElementById("error");

loginForm.addEventListener("submit", function (event) {
  event.preventDefault();
  const formData = { email: loginEmail.value, password: loginPassword.value };
  const chargeUtile = JSON.stringify(formData);
  fetch("http://localhost:5678/api/users/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: chargeUtile,
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      if (data.token) {
        window.sessionStorage.setItem("token", data.token);
        window.location = "index.html";
      } else {
        error_message.classList.replace("inactive", "active");
        console.log("Erreur dans l`identifiant ou le mot de passe");
      }
    });
});
