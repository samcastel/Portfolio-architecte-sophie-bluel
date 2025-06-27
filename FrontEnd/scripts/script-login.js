let form = document.querySelector("form");
form.addEventListener("submit", (event) => {
    event.preventDefault();
    let email = document.getElementById("mail");
    let motDePasse = document.getElementById("mdp");
    const loginError = document.querySelector(".login-error");
    loginError.style.display = "none";
    
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
            loginError.style.display = "block";
            loginError.innerHTML = "E-mail ou mot de passe invalide";
        }
      }).then((reponse2)=>{
        if(reponse2){
        localStorage.setItem("token", reponse2.token);
        window.location.href = "index.html"}
      }).catch((e)=>{
        loginError.style.display = "block";
        loginError.innerHTML = "Une erreur de connexion s'est produite";
      })  
})
