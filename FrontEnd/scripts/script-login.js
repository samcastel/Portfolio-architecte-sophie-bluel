let form = document.querySelector("form");
form.addEventListener("submit", (event) => {
    event.preventDefault();
    let email = document.getElementById("mail");
    let motDePasse = document.getElementById("mdp");
    fetch("http://localhost:5678/api/users/login", {
        method:"post", 
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify({
          "email": email.value,
        "password": motDePasse.value
        })
      }).then((reponse2)=>{
        if (reponse2.ok){
          return reponse2.json()
        } else{
            console.error("email ou mdp invalide");
        }
      }).then((reponse2)=>{
        if(reponse2){
        console.log(reponse2);
        localStorage.setItem("token", reponse2.token);
        window.location.href = "index.html"}
      }).catch((e)=>{
        console.error(e);
      })
    // Chercher email et mdp entrés
    // Faire un fetch vers la route du login en envoyant les param email et mdp
})






    // else if(motDePasse.value.trim() == ""){
    //     alert("Entrez un mot de passe valide");
    //}


// Utiliser Postman. Si pas bon mdp ou email => 401 sinon => 200

/*const authentification = async(req,res,next) => {
    try{


        next();
    }

    catch(){
        res.status(401)("Entrez vos codes d'accès")
    }
}*/

//local storage





