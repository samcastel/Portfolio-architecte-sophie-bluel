//propriété scroll appliquée au body
// overflow hidden



let ajoutPhoto = document.getElementById("ajoutPhoto");
let boutonAjout = document.getElementById("bouton-ajout");
let addphoto = document.querySelector(".addphoto");
let galerie = document.querySelector(".galerie");
let quitter = document.querySelector(".quitter img");
let quitter2 = document.querySelector(".quitter2 img");
let retour = document.querySelector(".fleche img");
 
ajoutPhoto.addEventListener("click", () => {galerie.style.display="flex"});
boutonAjout.addEventListener("click", () => {addphoto.style.display="flex"});


quitter.addEventListener("click", () => {galerie.style.display="none"});
quitter2.addEventListener("click", () => {addphoto.style.display="none", galerie.style.display="none"});
retour.addEventListener("click", () => {addphoto.style.display="none", galerie.style.display="flex"});


//switch
//case true:
//case false:







