const fileButton = document.querySelector("#filebutton");
/* ajout photo */


// Fonction qui vérifie si le formulaire est complet ou non.
const checkForm = () => {
    
    if(form_titre.value !== "" && form_selectCategory.value !== "" && form_inputFile.files.length > 0){
        validationBout.style.background = "#1d6154";
        validationBout.disabled = false;
    }
    else{
        validationBout.style.background = "#a7a7a7";
        validationBout.disabled = true;
    }
}

// Gestion inputs formulaire ajout photo
form_selectCategory.addEventListener("change", checkForm);

form_titre.addEventListener("change", checkForm);

const changeImage = (e) => {
    const file = e.target.files[0];
    if(file){
     form_addPict.style.display = "none";
     
     const imageURL = URL.createObjectURL(file);
     form_fileImage.src = imageURL;
     form_fileImage.style.display = "block";
    }
    checkForm();
 }

form_inputFile.addEventListener("change", changeImage);

const depotPhoto = () => {
    form_inputFile.click()
}

fileButton.addEventListener("click", depotPhoto);

checkForm();

/* envoi image */
const envoiImg = () => {
    const formData = new FormData();
    formData.append("image", form_inputFile.files[0]);
    formData.append("title", form_titre.value);
    formData.append("category", form_selectCategory.value);
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