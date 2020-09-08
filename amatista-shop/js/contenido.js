const user = document.querySelector('#id').value;
let iCont = 0;
let contenedor = document.querySelector('.contenedor__img');
let datos = new FormData();
datos.append("user", user)
fetch('controller/contenido.php', {
    method: 'post',
    body: datos
})
.then(res => res.json())
.then(data => {
    console.log(data);
    
    for(let ticket of data.tickets){
        let cont = contenedor.appendChild(document.createElement('div'));
            cont.setAttribute('class', 'cont__extra center');
        let ticketP = cont.appendChild(document.createElement('p'));
            ticketP.textContent=`Contenido del Ticket : `;
        let ticketSpan = ticketP.appendChild(document.createElement('span'));
            ticketSpan.textContent=ticket.no_ticket;
        for(let imagen of ticket.imagenes){
            let extraImg = cont.appendChild(document.createElement('div'));
                extraImg.setAttribute('class', 'extra');
            let img = extraImg.appendChild(document.createElement('img'));
            let urlImagenesNalural = `img/${ticket.tipo}/${imagen.url}`;
            fetch(urlImagenesNalural)
            .then(res => res.blob())
            .then(imagen => {
                urlImg = URL.createObjectURL(imagen);
                img.setAttribute('src', urlImg);
                let a = extraImg.appendChild(document.createElement('a'));
                    a.setAttribute('class', 'ver__contenido');
                    a.setAttribute('data-format', 'img');
                    a.setAttribute('href', urlImg);
                    a.textContent="Ver Imagen";
            });
        }
        for(let vide of ticket.video){
            let extraVid = cont.appendChild(document.createElement('div'));
                extraVid.setAttribute('class', 'extra');
            let vid = extraVid.appendChild(document.createElement('video'));
            fetch(`vid/${ticket.tipo}/${vide.url}`)
            .then(res => res.blob())
            .then(video => {
                urlVid = URL.createObjectURL(video);
                vid.setAttribute('src', urlVid);
                let a = extraVid.appendChild(document.createElement('a'));
                    a.setAttribute('class', 'ver__contenido');
                    a.setAttribute('data-format', 'vid');
                    a.setAttribute('href', urlVid);
                    a.textContent="Ver Video";
                    botones();
            });
        } 
    };
})
.catch(error => {
    console.log('Error : ');
    console.log(error);
});
function botones(){
    document.querySelectorAll('.extra').forEach(pre=>{
        pre.addEventListener('mouseenter', () => {
            document.querySelectorAll('.extra').forEach(pre=>pre.style="filter: grayscale(100%);");
            pre.style="filter: grayscale(0%);";
        });
        pre.addEventListener('mouseleave', () => {
            document.querySelectorAll('.extra').forEach(pre=>pre.style="filter: grayscale(0%);");
        });
    });
    let verContenido = document.querySelectorAll('.ver__contenido');
    for(let i = 0; i < verContenido.length; i++){
        verContenido[i].addEventListener('click', e => {
            e.preventDefault();
            let $format = verContenido[i].dataset.format;
            let $src = verContenido[i].href;
            iCont = i;
            mostrarContenido($format,$src);
        });
    };
};
function mostrarContenido(format,src){
    if(!document.querySelector('.modal')){
        let modal = document.body.appendChild(document.createElement('div'));
            modal.setAttribute('class', 'modal center');
        let contenedor = modal.appendChild(document.createElement('div'));
            contenedor.setAttribute('class', 'cont__extra__item center');
        let item = contenedor.appendChild(document.createElement('div'));
            
        if(format==="img"){
            item.setAttribute('class',' extra__item img center');
            let img = item.appendChild(document.createElement('img'));
                img.setAttribute('src', src);
        }else{
            item.setAttribute('class',' extra__item vid center');
            let vid = item.appendChild(document.createElement('video'));
                // vid.setAttribute('src', src);
                // vid.setAttribute('muted', "");
                // vid.setAttribute('loop', "");
                // vid.setAttribute('controls', "");
                // vid.setAttribute('preload', 'auto');
                // vid.setAttribute('controlsList', 'nodownload');
                vid.setAttribute('id', 'my-video');
                vid.setAttribute('class', "video-js vjs-big-play-centered");
                vid.setAttribute('controls', "");
                // vid.setAttribute('preload', 'auto');
                vid.setAttribute('data-setup',"{}");
            let source = vid.appendChild(document.createElement('source'));
                source.setAttribute('src', src);
                source.setAttribute('type', 'video/mp4');
            if(document.querySelector('#my-video source')){
                myVideoJs('my-video');
            }     
        };
        let fIzq = item.appendChild(document.createElement('div'));
            fIzq.setAttribute('class','arrow izq center');
            fIzq.setAttribute('id', 'prev');
            fIzq.innerHTML=`<i class="fas fa-chevron-left"></i>`;
        let fDer = item.appendChild(document.createElement('div'));
            fDer.setAttribute('class','arrow der center');
            fDer.setAttribute('id', 'next');
            fDer.innerHTML=`<i class="fas fa-chevron-right"></i>`;
        let contBtn = contenedor.appendChild(document.createElement('div'));
            contBtn.setAttribute('class', 'contenedor__boton');
        let btn = contBtn.appendChild(document.createElement('div'));
            btn.setAttribute('class', 'boton');
        let txtBtn = btn.appendChild(document.createElement('span'));
            txtBtn.setAttribute('class', 'texto__boton');
            txtBtn.textContent="Volver";
        if(txtBtn){
            document.querySelectorAll('.boton').forEach(btn=>{
                btn.addEventListener('click', () => {
                    if(document.querySelector('#my-video source')){
                        myVideoJs('my-video','end');
                    };
                    document.querySelector('.modal').remove()
                });
            });
            document.querySelector('#prev').addEventListener('click', () => {
                movConenido('prev');
            });
            document.querySelector('#next').addEventListener('click', () => {
                movConenido('next'); 
            });
            window.addEventListener('keyup', e=>{    
                teclas(e);
            });
        };
    };
};
function movConenido(mover){
    if(document.querySelector('#my-video source')){
        myVideoJs('my-video','end');
    };
    let item = document.querySelectorAll('.ver__contenido');
    document.querySelector('.modal').remove();
    if(mover === "next"){
        iCont++;
    }else{
        iCont--;
    };
    if(iCont >= 0 && iCont <= item.length -1){
        let src = item[iCont].href;
        let format = item[iCont].dataset.format;
        mostrarContenido(format,src);
    };
};
function teclas(e){    
    if(e.keyCode==27){
        document.querySelector('.modal').remove()
    }
    // if(e.keyCode==39){
    //     movConenido('next');
    // }
    // if(e.keyCode==37){
    //     movConenido('prev');
    // };
    // console.log(e.keyCode);
};
function myVideoJs(video,opt){
    
    var options = {};
    var player = videojs(video, options, function onPlayerReady() {
        fluid:true
    });
    
    if(opt=='end'){
        endVideo();
    }
    function endVideo(){
        player.dispose();
    }
};