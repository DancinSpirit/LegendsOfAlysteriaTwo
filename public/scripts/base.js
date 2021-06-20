if(!user){
    if(states[1]!="register"){
        states = ["main","login"];
        window.history.pushState(states, "Login Page", "/main/login");
    }
}else if(!states[1]){
    states[1] = "home";
    window.history.pushState(states, "Home Page", "/main/home");
} 

loadStates();

window.addEventListener('popstate',(event)=>{
    states = event.state;
    loadStates();
})

/* Should probably add a First Time Loading function that triggers automatically/when pop state triggers that disables animations or something */