//propriété scroll appliquée au body
// overflow hidden


const token = localStorage.getItem("token");            
const login = document.getElementById("login");
const logout = document.getElementById("logout");

logout.addEventListener("click", () => {
  localStorage.removeItem("token");
  token = "";
  initialisation();
})

let boutTous = document.getElementById("but1");
let boutObjets = document.getElementById("but2");
let boutAppartements = document.getElementById("but3");
let boutHotels = document.getElementById("but4");

let projets = [];

boutTous.addEventListener("click", () => {showGalerie(projets, "tous")});
boutObjets.addEventListener("click", () => {showGalerie(projets, 1)});
boutAppartements.addEventListener("click", () => {showGalerie(projets, 2)});
boutHotels.addEventListener("click", () => {showGalerie(projets, 3)});

const initialisation = () => {
  const modeEditionContainer = document.querySelector(".mode-edition-container");
  if(token){
    modeEditionContainer.style.display = "block";
    boutonModifier.style.display = "block";
    login.style.display = "none",
    logout.style.display = "inline"
  }
  else{
    modeEditionContainer.style.display = "none";
    boutonModifier.style.display = "none";
    login.style.display = "inline";
    logout.style.display = "none";
  }
}

initialisation();

const showGalerie = (data,categorie) => {
  let modalContainer = document.querySelector(".galerie__container");
  let galerie = document.querySelector(".gallery");
  galerie.innerHTML = "";
  modalContainer.innerHTML = "";
  for(let i = 0; i<data.length; i++){
    if(data[i].category.id === categorie || categorie === "tous"){
    const galleryItem = buildGalleryItem(data[i]);
    galerie.appendChild(galleryItem); 
    const modalGalleryItem = buildModalPict(data[i]);
    modalContainer.appendChild(modalGalleryItem);
    }
  }
}

const actualiserGalerie = () => {
fetch("http://localhost:5678/api/works").then((reponse)=>{
  if (reponse.ok){
    return reponse.json()
  } else{
    throw new Error(reponse.status)
  }
}).then((data)=>{
  console.log(data);
  projets = data;
  showGalerie(data,"tous");

}).catch((e) => {
  if (e = 404){
    alert("La donnée n'a pas été trouvée");
  }
  else{
    console.log(e);
  alert("Une erreur s'est produite veuillez rafraichir la page");
  }
  
})
}

actualiserGalerie();

//Fonction création d'un élément dans la galerie
const buildGalleryItem = (item) => {
    let title = item.title;
    let imageUrl = item.imageUrl;
    let imageElement = document.createElement("img");
    imageElement.src = imageUrl;
    let titleElement = document.createElement("figcaption");
    titleElement.innerText = title;
    let figure = document.createElement("figure");
    figure.appendChild(imageElement);
    figure.appendChild(titleElement); 
    return figure;
}

//Création des images dans la modale
const buildModalPict = (item) => {
let imageUrl = item.imageUrl;
let imageElement = document.createElement("img");
imageElement.src = imageUrl;
let figure = document.createElement("figure");
figure.appendChild(imageElement);
const button = document.createElement("button");
button.dataset.id = item.id;
button.classList.add("deleteButton");
button.addEventListener("click", deleteWork)
let deleteIcon = document.createElement("img");
deleteIcon.src = "/FrontEnd/assets/icons/delete.png";
button.appendChild(deleteIcon);
figure.appendChild(button);
return figure;  
}


const deleteWork = (e) => {
  console.log("suppression du projet", e.target.parentElement.dataset.id);
  const token = localStorage.getItem("token");
  fetch("http://localhost:5678/api/works/" + e.target.parentElement.dataset.id, 
    {method:"delete", headers: {Authorization:"bearer " + token}}
  ).then((reponse) => {
    if(!reponse.ok){
      if(reponse.status === 401){
          alert("Connexion expirée. Veuillez vous reconnecter")
          window.location.href = "index-login.html"
          return;
      }
      throw new Error(JSON.stringify(reponse));
  }
    actualiserGalerie();
  }).catch((e) => {
    console.error(e);
    alert("Erreur suppression du projet");
  });
}

fetch("http://localhost:5678/api/works", {
  method:"post", 
  headers:{
    "Content-Type":"application/json",
    "Authorization":"Bearer " + localStorage.getItem("token")
  },
  body:JSON.stringify({
    "email": "sophie.bluel@test.tld",
  "password": "S0phie"
  })
}).then((reponse2)=>{
  if (reponse2.ok){
    return reponse2.json()
  }
}).then((reponse2)=>{
  console.log(reponse2);
  console.log("hello"); 
})


