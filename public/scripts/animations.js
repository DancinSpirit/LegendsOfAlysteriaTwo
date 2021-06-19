const left = async function(index, component){
    return new Promise((resolve)=>{
        $(`#sub-${states[index]}`).attr("id","old-sub-state");
        $(`#sub-${states[index]}-container`).append(`<section id="sub-${states[index]}"></section>`)
        $(`#sub-${states[index]}`).html(component);
        $(`#sub-${states[index]}-container`).css("transition","1000ms");
        $(`#sub-${states[index]}-container`).css("transform","translateX(-50%)")
        setTimeout(function(){
            $(`#sub-${states[index]}-container`).css("transition","0ms");
            $("#old-sub-state").remove();
            $(`#sub-${states[index]}-container`).css("transform","translate(0%,0%)");
            resolve();
        },1000)
    })
}
const right = async function(index, component){
    return new Promise((resolve)=>{
        $(`#sub-${states[index]}`).attr("id","old-sub-state");
        $(`#sub-${states[index]}-container`).prepend(`<section id="sub-${states[index]}"></section>`)
        $(`#sub-${states[index]}`).html(component);
        $(`#sub-${states[index]}-container`).css("transform","translateX(-50%)");
        setTimeout(function(){
            $(`#sub-${states[index]}-container`).css("transition","1000ms");
            $(`#sub-${states[index]}-container`).css("transform","translateX(0%)")
            setTimeout(function(){
                $(`#sub-${states[index]}-container`).css("transition","0ms");
                $("#old-sub-state").remove();
                $(`#sub-${states[index]}-container`).css("transform","translate(0%,0%)");
                resolve();
            },1000)
        },10);
    })
}





