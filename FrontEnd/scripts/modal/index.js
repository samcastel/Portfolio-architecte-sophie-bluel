// Form elements
const form_addPict = document.querySelector(".add-pic-containt");
const form_titre = document.querySelector("#titre");
const form_selectCategory = document.querySelector("#cat");
const form_fileImage = document.querySelector("#fileImage");
const form_inputFile = document.querySelector("#file");

/* Modal elements*/
let overlay = document.querySelector(".overlay");
let modal = document.querySelector(".modal");
let fleche = document.querySelector(".fleche");
let modalTitle = document.querySelector(".modal__title");

/* Modal contents */
let galleryContent = document.querySelector(".galerie__container");
let photoFormulaire = document.querySelector(".addphoto__formulaire");

/* Modal buttons */
let ajoutPhotoBout = document.querySelector("#ajoutPhoto");
let validationBout = document.querySelector("#submitForm");


// Affichage de la modale
let boutonModifier = document.getElementById("boutonModifier");
boutonModifier.addEventListener("click", () => {
    overlay.style.display="flex"
    document.body.style.overflow = "hidden";
});


/* Fermeture de la modale */
const fermerModal = () => {
    overlay.style.display="none";
    document.body.style.overflow = "auto";
    afficherGalerie();
    viderForm();
}

const viderForm = () => {
    form_titre.value = "";
    form_fileImage.src = "";
    form_fileImage.style.display = "none";
    form_inputFile.value = "";
    form_selectCategory.value = "";
    form_addPict.style.display = "flex";
}

let boutQuitter = document.querySelector(".quitter");
boutQuitter.addEventListener("click", fermerModal);

overlay.addEventListener("click", fermerModal);
modal.addEventListener("click", (e) => {
    e.stopPropagation();
})


/* Navigation dans la modale */
const afficherGalerie = () => {
    photoFormulaire.style.display = "none";
    galleryContent.style.display = "flex";
    fleche.style.display = "none";
    ajoutPhotoBout.style.display = "block";
    validationBout.style.display = "none";
    modalTitle.innerHTML = "Galerie Photo"
    viderForm();
}


const ouvrirAjout = () => {
    ajoutPhotoBout.style.display = "none";
    galleryContent.style.display = "none";
    fleche.style.display = "block";
    validationBout.style.display = "block";
    photoFormulaire.style.display = "flex";
    modalTitle.innerHTML = "Ajout Photo";
}

fleche.addEventListener("click", afficherGalerie);

ajoutPhotoBout.addEventListener("click", ouvrirAjout);


// Initialisation du formulaire

// On récupère les catagories pour les afficher dans le select
const chercherCat = () => {
    fetch("http://localhost:5678/api/categories").then((reponse) => {
        if(reponse.ok){
            return reponse.json();
        }
        throw new Error(JSON.stringify(reponse));
    }).then((data) => {
        const option = document.createElement("option");
        option.value = "";
        option.selected = true;
        option.hidden = true;
        form_selectCategory.appendChild(option);
        data.forEach(category => {
            const option = document.createElement("option");
            option.value = category.id;
            option.innerText = category.name;
            form_selectCategory.appendChild(option);
        });
    } ).catch((e) => {
        console.error(e);
    })
}

chercherCat();


