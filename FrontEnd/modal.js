
const fileButton = document.querySelector("#filebutton");
const addPict = document.querySelector(".add-pic-containt");
const titre = document.querySelector("#titre");
const selectCategory = document.querySelector("#cat");
const fileImage = document.querySelector("#fileImage");
const inputFile = document.querySelector("#file");


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
    addPict.style.display = "flex";
    afficherGalerie();
    viderForm();
}

const viderForm = () => {
    titre.value = "";
    fileImage.src = "";
    fileImage.style.display = "none";
    inputFile.value = "";
}



const afficherGalerie = () => {
    photoFormulaire.style.display = "none";
    galleryContent.style.display = "flex";
    fleche.style.display = "none";
    ajoutPhotoBout.style.display = "block";
    validationBout.style.display = "none";
    modalTitle.innerHTML = "Galerie Photo"
    addPict.style.display = "flex";
    viderForm();
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
    photoFormulaire.style.display = "flex";
    modalTitle.innerHTML = "Ajout Photo";
    addPict.style.display = "flex";
}

ajoutPhotoBout.addEventListener("click", ouvrirAjout);


const chercherCat = () => {
    fetch("http://localhost:5678/api/categories").then((reponse) => {
        if(reponse.ok){
            return reponse.json();
        }
        throw new Error(JSON.stringify(reponse));
    }).then((data) => {
        console.log(data);
        data.forEach(category => {
            const option = document.createElement("option");
            option.value = category.id;
            option.innerText = category.name;
            selectCategory.appendChild(option);
        });
    } ).catch((e) => {
        console.error(e);
    })
}

chercherCat();

/* ajout photo */

const depotPhoto = () => {
    
    inputFile.click()
    /*
    console.log("ok");
    validationBout.style.background = "#1d6154";
    validationBout.addEventListener("click", ouvrirAjout);*/
}

const checkForm = () => {
    
    if(titre.value !== "" && selectCategory.value !== "" && inputFile.files.length > 0){
        validationBout.style.background = "#1d6154";
        validationBout.disabled = false;
    }
    else{
        validationBout.style.background = "#a7a7a7";
        validationBout.disabled = true;
    }
}

const changeImage = (e) => {
   const file = e.target.files[0];
   if(file){
    addPict.style.display = "none";
    
    const imageURL = URL.createObjectURL(file);
    fileImage.src = imageURL;
    fileImage.style.display = "block";
   }
   checkForm();
}

selectCategory.addEventListener("change", checkForm);

titre.addEventListener("change", checkForm);

inputFile.addEventListener("change", changeImage);

fileButton.addEventListener("click", depotPhoto);

checkForm();

/* envoi image */
const envoiImg = () => {
    const formData = new FormData();
    formData.append("image", inputFile.files[0]);
    formData.append("title", titre.value);
    formData.append("category", selectCategory.value);
    fetch("http://localhost:5678/api/works", {
        method: "post",
        body: formData,
        headers: {
            Authorization: "bearer " + localStorage.getItem("token")
        }
    }).then((reponse) => {
        if(!reponse.ok){
            if(reponse.status === 401){
                alert("Connexion expirée. Veuillez vous reconnecter")
                window.location.href = "index-login.html"
                return;
            }
            throw new Error(JSON.stringify(reponse));
        }
        fermerModal()
        actualiserGalerie()
    }).catch((e) => {
        console.error(e);
        alert("Une erreur s'est produite");
    })
}

validationBout.addEventListener("click", envoiImg);

/*objet formData*/
/*envoi images avec fetch*/

// const chercherCat = () => {
//     fetch("http://localhost:5678/api/categories").then((reponse) => {
//         if(reponse.ok){
//             return reponse.json();
//         }
//         throw new Error(JSON.stringify(reponse));
//     }).then((data) => {
//         console.log(data);
//         data.forEach(category => {
//             const option = document.createElement("option");
//             option.value = category.id;
//             option.innerText = category.name;
//             selectCategory.appendChild(option);
//         });
//     } ).catch((e) => {
//         console.error(e);
//     })
// }
