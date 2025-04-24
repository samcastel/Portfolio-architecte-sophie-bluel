

let ajoutPhotoBout = document.querySelector("#ajoutPhoto");
let validationBout = document.querySelector("#submitForm");
let galleryContent = document.querySelector(".galerie__container");
let fleche = document.querySelector(".fleche");
let photoFormulaire = document.querySelector(".addphoto__formulaire");
let modalTitle = document.querySelector(".modal__title");


let overlay = document.querySelector(".overlay");
let modal = document.querySelector(".modal");
modal.addEventListener("click", (e) => {
    e.stopPropagation();
})

let boutonModifier = document.getElementById("boutonModifier");
boutonModifier.addEventListener("click", () => {
    console.log("click");
    overlay.style.display="flex"
    document.body.style.overflow = "hidden";
});

const fermerModal = () => {
    overlay.style.display="none";
    document.body.style.overflow = "auto";
    afficherGalerie();
}



const afficherGalerie = () => {
    photoFormulaire.style.display = "none";
    galleryContent.style.display = "flex";
    fleche.style.display = "none";
    ajoutPhotoBout.style.display = "block";
    validationBout.style.display = "none";
    modalTitle.innerHTML = "Galerie Photo"
}

fleche.addEventListener("click", afficherGalerie);

let boutQuitter = document.querySelector(".quitter");
boutQuitter.addEventListener("click", fermerModal);

overlay.addEventListener("click", fermerModal);


const ouvrirAjout = () => {
    
    ajoutPhotoBout.style.display = "none";
    galleryContent.style.display = "none";
    fleche.style.display = "block";
    validationBout.style.display = "block";
    photoFormulaire.style.display = "block";
    modalTitle.innerHTML = "Ajout Photo";
}

ajoutPhotoBout.addEventListener("click", ouvrirAjout);
