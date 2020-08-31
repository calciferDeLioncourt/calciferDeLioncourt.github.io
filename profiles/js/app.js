const form = document.querySelector('#profile'),
    search = document.querySelector('#search'),
    pass = document.querySelector('#pass');
let superUser = false;
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
            modalData();
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
            table(datos);
        }else{
            document.querySelector('#nombre').textContent='No hay datos';
        };
        function table(datos){
            document.querySelector('#nombre').textContent = datos[0].firstName+" "+datos[0].lastName;
            document.querySelector('#cargo').textContent = datos[0].cargo;
            document.querySelector('#curp').textContent = datos[0].curp.toUpperCase();
            document.querySelector('#rfc').textContent = datos[0].rfc.toUpperCase();
            document.querySelector('#email').textContent = datos[0].email;
            document.querySelector('#birthday').textContent = datos[0].birthday;
            document.querySelector('#claveelectoral').textContent = datos[0].claveelectoral;
            document.querySelector('#ine').textContent = datos[0].ine;
            document.querySelector('#seguro').textContent = datos[0].seguro;
            document.querySelector('#foto');
        };
    })
    .catch(error => {
        console.log('Error : ');
        console.log(error);
    });
};
function modalData(){
    let contId = document.querySelector('body').appendChild(document.createElement('div'));
        contId.setAttribute('class', 'id');
    let header = contId.appendChild(document.createElement('header'));
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
    let btnClose = header.appendChild(document.createElement('div'));
        btnClose.setAttribute('class', 'btn__close');
    let iconClose = btnClose.appendChild(document.createElement('i'));
        iconClose.setAttribute('class', 'fas fa-times');
    let tarjeta = contId.appendChild(document.createElement('div'));
        tarjeta.setAttribute('class', 'tarjeta');
        bloque('Nombre');
        bloque('Cargo');
        bloque('CURP');
        bloque('RFC');
        bloque('E-mail');
        bloque('Birthday');
        bloque('Clave Electoral');
        bloque('INE');
        bloque('Seguro');
    let foto = tarjeta.appendChild(document.createElement('div'));
        foto.setAttribute('class', 'title');
        foto.textContent='Foto :';
    let contFoto = tarjeta.appendChild(document.createElement('div'));
        contFoto.setAttribute('class', 'cont__foto');
    let imgFoto = contFoto.appendChild(document.createElement('img'));
        imgFoto.setAttribute('id', 'foto');
        imgFoto.setAttribute('src','');
    const clipboard = document.querySelectorAll(".clipboard"),
        cont = document.querySelectorAll(".cont"),
        close = document.querySelector(".btn__close");
    for(let i = 0; i < clipboard.length; i++){
        clipboard[i].addEventListener('click', e => {
            let textoACopiar = cont[i];
            let seleccion = document.createRange();
                seleccion.selectNodeContents(textoACopiar);
            window.getSelection().removeAllRanges();
            window.getSelection().addRange(seleccion);
            let res = document.execCommand('copy');
            window.getSelection().removeAllRanges(seleccion);
        });
    };
    close.addEventListener('click', ()=>{
        document.querySelector('.id').remove();
    });
    function bloque(element){
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
    };
}