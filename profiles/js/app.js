const form = document.querySelector('#profile'),
    search = document.querySelector('#search'),
    pass = document.querySelector('#pass');
let superUser = false;
header();
search.addEventListener('keyup', ()=> {
    busqueda = search.value = search.value.toLowerCase().replace(/\b[a-z]/g, function(letter){
        return letter.toUpperCase();
    });
});
form.addEventListener('submit', e => {
    e.preventDefault();
    listar(busqueda); 
});
function listar(buscar){
    fetch('json/profiles.json')
    .then(res => res.json())
    .then(data => {
        let datos=[];
        if(data.password === pass.value){
            let $profile = buscar;
            let profile = data.profiles.filter(profile=>profile.firstName === $profile);
            if(profile.length >= 1 && profile[0].profile === "public"){
                datos.push(profile[0]);
            }else if(profile.length >= 1 && profile[0].profile === "private" && superUser === true){
                datos.push(profile[0]);
            }else{
                document.querySelector('#nombre').textContent='No hay datos o el contenido no es publico';
                return
            };
        };
        if(datos.length >= 1){
            modalData(datos);
        }else{
            document.querySelector('#nombre').textContent='No hay datos';
        };
    })
    .catch(error => {
        console.log('Error : ');
        console.log(error);
    });
};
function modalData(data){
    // >>>>> -->>>>> ----- datos de perfil ----- <<<<<-- <<<<<
    
    let btnClose = document.querySelector('.header').appendChild(document.createElement('div'));
        btnClose.setAttribute('class', 'btn__close');
    let iconClose = btnClose.appendChild(document.createElement('i'));
        iconClose.setAttribute('class', 'fas fa-times');
    let contId = document.querySelector('body').appendChild(document.createElement('div'));
        contId.setAttribute('class', 'id');
    let tarjeta = contId.appendChild(document.createElement('div'));
        tarjeta.setAttribute('class', 'tarjeta');
        bloque('Nombre',data[0].firstName+" "+data[0].lastName);
        bloque('Cargo', data[0].cargo);
        bloque('CURP', data[0].curp.toUpperCase());
        bloque('RFC', data[0].rfc.toUpperCase());
        bloque('E-mail', data[0].email);
        bloque('Birthday', data[0].birthday);
        bloque('Clave Electoral', data[0].claveelectoral);
        bloque('INE', data[0].ine);
        bloque('Seguro', data[0].seguro);
        if(data[0].databank.length>0){
            for(dataBank of data[0].databank){
                if(dataBank.clabe != "" && dataBank.clabe.length === 18){
                    bloque(`Banco ${dataBank.banco}(CLABE)`, dataBank.clabe);
                };
                if(dataBank.cuenta != ""){
                    bloque(`Banco ${dataBank.banco}(Cuenta)`, dataBank.cuenta);
                };
            };
        };
    // let foto = tarjeta.appendChild(document.createElement('div'));
    //     foto.setAttribute('class', 'title');
    //     foto.textContent='Foto :';
    // let contFoto = tarjeta.appendChild(document.createElement('div'));
    //     contFoto.setAttribute('class', 'cont__foto');
    // let imgFoto = contFoto.appendChild(document.createElement('img'));
    //     imgFoto.setAttribute('id', 'foto');
    //     imgFoto.setAttribute('src','');
    // >>>>> -->>>>> ----- funcion de datos ----- <<<<<-- <<<<<
    
    function bloque(element,info){
        let cont = tarjeta.appendChild(document.createElement('div'));
            cont.setAttribute('class', 'cont__element');
        let contText = cont.appendChild(document.createElement('div'));
            contText.setAttribute('class','cont__text');

        let div1 = contText.appendChild(document.createElement('div'));
            div1.setAttribute('class', 'title');
            div1.textContent= element+': ';
        let icon = cont.appendChild(document.createElement('i'));
            icon.setAttribute('class', 'clipboard fas fa-clipboard');
            icon.setAttribute('title', 'Copiar');
        let div2 = contText.appendChild(document.createElement('div'));
            div2.setAttribute('id', element.toLowerCase().replace(/[\-\s]/g, ''));
            div2.setAttribute('class', 'cont');
            div2.textContent=info;
    };
    const clipboard = document.querySelectorAll(".clipboard"),
        cont = document.querySelectorAll(".cont"),
        close = document.querySelector(".btn__close");
    // >>>>> -->>>>> ----- copidar datos de bloque ----- <<<<<-- <<<<<
    
    for(let i = 0; i < clipboard.length; i++){
        clipboard[i].addEventListener('click', e => {
            let textoACopiar = cont[i];
            let seleccion = document.createRange();
                seleccion.selectNodeContents(textoACopiar);
            window.getSelection().removeAllRanges();
            window.getSelection().addRange(seleccion);
            let res = document.execCommand('copy');
            window.getSelection().removeAllRanges(seleccion);
            myAlert('.title',i);
        });
    };
    // >>>>> -->>>>> ----- eliminar modal ----- <<<<<-- <<<<<
    
    close.addEventListener('click', ()=>{
        document.querySelector('.id').remove();
        document.querySelector('.btn__close').remove();
    });
    function myAlert(contenedor,indice){
        let mensaje = document.body.appendChild(document.createElement('div'));
            mensaje.setAttribute('class','mensaje__alert');
            mensaje.textContent= 'Copiado a porta papeles : '+document.querySelectorAll(contenedor)[indice].textContent;
        setTimeout(() => {
            mensaje.style='opacity:0;'
            setTimeout(() => {
                mensaje.remove();
            }, 300);
        }, 2000);
    }
}
function header(){
    let header = document.body.insertBefore(document.createElement('header'), document.querySelector('.cont_img'));
        header.setAttribute('class', 'header');
    let contImgId = header.appendChild(document.createElement('div'));
        contImgId.setAttribute('class', 'cont_img_id');
    let img = contImgId.appendChild(document.createElement('img'));
        img.setAttribute('class', 'img__header');
        fetch('img/diseno-jizra-logo.png')
        .then(res => res.blob())
        .then(imagen => {
            let imgHeader = URL.createObjectURL(imagen);
            img.setAttribute('src', imgHeader);
        });
    let textHeader = header.appendChild(document.createElement('div'));
        textHeader.setAttribute('class', 'p_header');
    let p = textHeader.appendChild(document.createElement('p'));
        p.textContent = 'id_Personal';
}