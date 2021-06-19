
if(!user){
    if(states[1]!="register")
        states = ["main","login"];
}else if(!states[1]){
    states[1] = "home";
} 

loadStates();

window.addEventListener('popstate',(event)=>{
    states = event.state;
    loadStates();
})

/* Should probably add a First Time Loading function that triggers automatically/when pop state triggers that disables animations or something */