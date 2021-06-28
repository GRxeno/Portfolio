
window.onscroll = function(){
    var top = window.scrollY;
    console.log(top);

    if(top > 570){
        header.classList.add('blueColor');
    }
    else{
        header.classList.remove('blueColor');
    }

}