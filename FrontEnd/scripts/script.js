//propriété scroll appliquée au body
// overflow hidden

// 1- appendChild OK

// 2- body:JSON.stringify OK

// 3- json-JSON OK

// 4- localStorage OK

// 5- token OK

// 6- Les méthodes GET, POST, DELETE, PUT OK

// 7- À quoi sert postman ? OK

// 8- À quoi sert swagger UI ? OK

// 9- Est-ce que c'est possible de voir un exemple avec une appli de gouv.fr par ex. ? OK

// 10- getElementById vs querySelector OK

/*async function afficherPhoto() {
try
    const reponse = await fetch("http://-------/.json");
    if (reponse.ok){
    const data = await reponse.json();
    }
catch => error
  }*/


const token = localStorage.getItem("token")            
const login = document.getElementById("login")
const logout = document.getElementById("logout")
if(token){
  login.style.display = "none",
  logout.style.display = "inline"
}
else{
  login.style.display = "inline";
  logout.style.display = "none";
}
logout.addEventListener("click", () => {
  localStorage.removeItem("token");
  login.style.display = "inline";
  logout.style.display = "none";
})

let boutonAjout = document.getElementById("bouton-ajout");
let addphoto = document.querySelector(".addphoto");
let galerie = document.querySelector(".galerie");
let quitter = document.querySelector(".quitter img");
let quitter2 = document.querySelector(".quitter2 img");
let retour = document.querySelector(".fleche img");

 

boutonAjout.addEventListener("click", () => {addphoto.style.display="flex"});


quitter.addEventListener("click", () => {galerie.style.display="none"});
quitter2.addEventListener("click", () => {addphoto.style.display="none", galerie.style.display="none"});
retour.addEventListener("click", () => {addphoto.style.display="none", galerie.style.display="flex"});



// const actualiserGalerie = () => {
// fetch("http://localhost:5678/api/works").then((reponse)=>{
//   if (reponse.ok){
//     return reponse.json()
//   } else{
//     throw new Error(reponse.status)
//   }
// }).then((data)=>{
//   console.log(data);
//   let modalContainer = document.querySelector(".galerie__container");
//   let galerie = document.querySelector(".gallery");
//   galerie.innerHTML = "";
//   modalContainer.innerHTML = "";
//   for(let i = 0; i<data.length; i++){
//     const galleryItem = buildGalleryItem(data[i]);
//     galerie.appendChild(galleryItem); 
//     const modalGalleryItem = buildModalPict(data[i]);
//     modalContainer.appendChild(modalGalleryItem);
//   }
// }).catch((e) => {
//   if (e = 404){
//     alert("La donnée n'a pas été trouvée");
//   }
//   else{
    
//   }
//   console.log(e);
//   alert("Une erreur s'est produite veuillez rafraichir la page");
// })
// }

let boutTous = document.getElementById("but1");
let boutObjets = document.getElementById("but2");
let boutAppartements = document.getElementById("but3");
let boutHotels = document.getElementById("but4");

let projets = [];

boutTous.addEventListener("click", () => {console.log("bouton 1"); showGalerie(projets, "tous")})
boutObjets.addEventListener("click", () => {console.log("bouton 2"); showGalerie(projets, 1)})
boutAppartements.addEventListener("click", () => {console.log("bouton 3"); showGalerie(projets, 2)} )
boutHotels.addEventListener("click", () => {console.log("bouton 4"); showGalerie(projets, 3)} )

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





// css position absolute pour le delete
// fonction ajout de projet à faire

const deleteWork = (e) => {
  console.log("suppression du projet", e.target.parentElement.dataset.id);
  const token = localStorage.getItem("token");
  fetch("http://localhost:5678/api/works/" + e.target.parentElement.dataset.id, 
    {method:"delete", headers: {Authorization:"bearer " + token}}
  ).then(() => {
    // Vérifier que la réponse est ok
    actualiserGalerie();
  }).catch((e) => {
    console.error(e);
    alert("Erreur suppression du projet");
  });
}

// fetch("http://localhost:5678/api/categories").then((reponse1)=>{
//   if (reponse1.ok){
//     return reponse1.json()
//   } else{
//     throw new Error();
//   }
// }).then((data)=>{
//   console.log(data);
//   console.log(data.length);
//   let boutTous = document.getElementById("but1");
//   let boutObjets = document.getElementById("but2");
//   let boutAppartements = document.getElementById("but3");
//   let boutHotels = document.getElementById("but4");
    
//   boutTous.addEventListener("click", () => {console.log("bouton 1")} )
//   boutObjets.addEventListener("click", () => {console.log("bouton 2")} )
//   boutAppartements.addEventListener("click", () => {console.log("bouton 3")} )
//   boutHotels.addEventListener("click", () => {console.log("bouton 4")} )
//   //fonction filter ?
// })



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

// let pictGalerie = document.querySelector(".galerie__container")

// choixPhoto1.addEventListener("click", () => {document.pictGalerie.innerHTML = "<img src='assets/images/abajour-tahina.png' alt='Abajour Tahina'>"});
// choixPhoto2.addEventListener("click", () => {console.log("photo2")});
// choixPhoto3.addEventListener("click", () => {console.log("photo3")});



// [
//   {
//     "id": 1,
//     "title": "Abajour Tahina",
//     "imageUrl": "http://localhost:5678/images/abajour-tahina1651286843956.png",
//     "categoryId": 1,
//     "userId": 1,
//     "category": {
//       "id": 1,
//       "name": "Objets"
//     }
//   }
// ]

// [
//   {
//     "id": 2,
//     "title": "Appartement Paris V",
//     "imageUrl": "http://localhost:5678/images/appartement-paris-v1651287270508.png",
//     "categoryId": 2,
//     "userId": 1,
//     "category": {
//       "id": 2,
//       "name": "Appartements"
//     }
//   }
// ]

// [
//   {
//     "id": 3,
//     "title": "Restaurant Sushisen - Londres",
//     "imageUrl": "http://localhost:5678/images/restaurant-sushisen-londres1651287319271.png",
//     "categoryId": 3,
//     "userId": 1,
//     "category": {
//       "id": 3,
//       "name": "Hotels & restaurants"
//     }
//   }
// ]




/*<div class="gallery">
			<figure id="pict1">
				<img src="assets/images/abajour-tahina.png" alt="Abajour Tahina">
				<figcaption>Abajour Tahina</figcaption>
			</figure>


const reponse = await fetch("pieces-autos.json");
const pieces = await reponse.json();


const article = pieces[0];


const imageElement = document.createElement("img");
imageElement.src = article.image;

const nomElement = document.createElement("h2");
nomElement.innerText = article.nom;

const prixElement = document.createElement("p");
prixElement.innertext = `Prix: ${article.prix} € (${article.prix < 35 ? "€" : "€€€"})`;

const categorieElement = document.createElement("p");
categorieElement.innertext = article.categorie ?? "(aucune catégorie)";


const sectionFiches = document.querySelector(".fiches");

sectionFiches.appendChild(imageElement);
sectionFiches.appendChild(nomElement);
sectionFiches.appendChild(prixElement);
sectionFiches.appendChild(categorieElement);*/



