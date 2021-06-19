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

const loadStates = async function(){
    for(let x=0; x<states.length; x++){
        console.log(x);
        $(`style-${x}`).remove();
        $("head").append($(`<link id='style-${x}' rel='stylesheet' type='text/css'/>`).attr('href',`/styles/${states[x]}.css`))
        let component = await load(`/component/${states[x]}`);
        if(x==0){
            $('body').html(component);
        }else{
            $(`#sub-${states[x-1]}`).html(component);
        }
    }
    deactivateButtons();
    activateButtons();
}

const deactivateButtons = function(){
    $("#login-button").off("click")
    $("#register-button").off("click")
}

const activateButtons = function(){
    $("#login-button").on("click", function(){
        states = ["main","login"]
        loadStates();
    })
    $("#register-button").on("click", function(){
        states = ["main","register"]
        loadStates();
    })
}