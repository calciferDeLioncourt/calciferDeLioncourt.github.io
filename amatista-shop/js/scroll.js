let progressBarr = document.body.appendChild(document.createElement('div'));
    progressBarr.setAttribute('class', 'progressbar');
let scrollPath = document.body.appendChild(document.createElement('div'));
    scrollPath.setAttribute('class', 'scrollpath');

window.addEventListener('load', ()=>{
    myScroll();
});

function myScroll(){
    let progress = document.querySelector('.progressbar');
    let totalHeight = document.body.scrollHeight - window.innerHeight;
    
    window.onscroll = function (){

        totalHeight = document.body.scrollHeight - window.innerHeight;
        // console.log(totalHeight);

        let progressHeight = (window.pageYOffset / totalHeight * 100);
        // console.log(progressHeight);
        progress.style.height = progressHeight + "%";
    };
};