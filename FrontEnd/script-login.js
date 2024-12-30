let form = document.querySelector("form");
form.addEventListener("submit", (event) => {event.preventDefault();})
let boutConnex = document.getElementById("button");
let email = document.getElementById("mail");
let motDePasse = document.getElementById("mdp");


boutConnex.addEventListener("click", () => {
    if(email.value != "" && motDePasse.value.trim() != "")
    {window.location.href = "index.html";}
    else if(motDePasse.value.trim() == ""){
        alert("Entrez un mot de passe valide");
    }
}
);





