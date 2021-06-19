const load = async function(url){
    return new Promise((resolve)=>{
        $.ajax({
            method: "GET",
            url: url,
            success: (res)=>{
                resolve(res);
            }
        })
    })
}

const loadState = async function(x, animation){
    console.log(x);
    $(`style-${x}`).remove();
    $("head").append($(`<link id='style-${x}' rel='stylesheet' type='text/css'/>`).attr('href',`/styles/${states[x]}.css`))
    let component = await load(`/component/${states[x]}`);
    if(x==0){
        $('body').html(component);
    }else{
        await eval(`${animation}(${x-1}, component)`)
    }
}


const loadStates = async function(){
    deactivateButtons();
    for(let x=0; x<states.length; x++){
        await loadState(x, "left");
    }
    activateButtons();
}

const deactivateButtons = function(){
    $("#login-button").off("click")
    $("#register-button").off("click")
}

const activateButtons = function(){
    $("#login-button").on("click", async function(){
        states = ["main","login"]
        window.history.pushState(states, "Login Page", "/main/login");
        deactivateButtons();
        await loadState(1, "left");
        activateButtons();
    })
    $("#register-button").on("click", async function(){
        states = ["main","register"]
        window.history.pushState(states, "Register Page", "/main/register");
        deactivateButtons();
        await loadState(1, "right");
        activateButtons();
    })
}