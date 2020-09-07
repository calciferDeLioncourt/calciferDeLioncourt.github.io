fetch('js/profile.json')
.then(res => res.json())
.then(data => {
    document.querySelector('.title__aside').textContent = data.nombre;
    let br = document.querySelector('.title__aside').appendChild(document.createElement('br'));
    let apellidos= document.querySelector('.title__aside').appendChild(document.createElement('span'));
        apellidos.textContent=data.apellidos;
    document.querySelector('.subtitle__profesion').textContent = `R.F.C : ${data.rfc}`;
    document.querySelector('.subtitle__profesion').style.fontSize='1em';
    fetch(`img/${data.foto}`)
    .then(res => res.blob())
    .then(imagen => {
        let img = URL.createObjectURL(imagen);
        document.querySelector('.img__perfil').src = img;
    });
    document.querySelector('.img__perfil').alt = `${data.nombre}${data.apellidos}`;
    // document.querySelector('.title__aside').textContent = data.nombre;
    document.querySelector('#mail').addEventListener('click', e => {
        window.location.href=`mailto:${data.email}`;
    });
    document.querySelector('#telefono').addEventListener('click', e => {
        window.location.href=`tel:+52${data.celular}`;
    });
    document.querySelector('#whatsapp').addEventListener('click', e => {
        let mensaje = `*Hola ${data.nombre} :*%0A `;
            mensaje.replace(/\s/g, '%20');
        window.open(`https://wa.me/52${data.celular}?text=${mensaje}`);
    });
    for(secciones of data.secciones){
        let seccion = document.querySelector('.curriculum').appendChild(document.createElement('section'));
            seccion.setAttribute('class','section__curriculum');
        let sectionTitle = seccion.appendChild(document.createElement('div'));
            sectionTitle.setAttribute('class', 'title__section center');
        let title = sectionTitle.appendChild(document.createElement('h2'));
            title.setAttribute('class', 'title');
            title.textContent=secciones.titulo;
        let adorno = sectionTitle.appendChild(document.createElement('hr'));
        let subtitulo = seccion.appendChild(document.createElement('h3'));
            subtitulo.setAttribute('class', 'subTitulo');
            subtitulo.textContent=secciones.subtitulo;
        let contLista = seccion.appendChild(document.createElement('ul'));
            contLista.setAttribute('class', 'cont__lista')
        for(contenido of secciones.contenido){
            let itemLista = contLista.appendChild(document.createElement('li'));
                itemLista.textContent=contenido;
        }; 
    };
    let contenSkills = document.querySelector('.curriculum').appendChild(document.createElement('section'));
        contenSkills.setAttribute('class', 'skills center');
    let sectionTitle = contenSkills.appendChild(document.createElement('div'));
            sectionTitle.setAttribute('class', 'title__section center');
    let title = sectionTitle.appendChild(document.createElement('h2'));
            title.setAttribute('class', 'title');
            title.textContent='Skills';
    let adorno = sectionTitle.appendChild(document.createElement('hr'));

    for(let i = 0; i < data.skills.length; i++){
        let contCircle = contenSkills.appendChild(document.createElement('div'));
            contCircle.setAttribute('class', 'cont__circle');
        let contInterior = contCircle.appendChild(document.createElement('div'));
            contInterior.setAttribute('class', 'interior');
        if(data.skills[i].icono != ""){
            let icon = contInterior.appendChild(document.createElement('img'));
            icon.setAttribute('class', 'img__icon');
            fetch(`img/${data.skills[i].icono}`)
            .then(res => res.blob())
            .then(imagen => {
                let img = URL.createObjectURL(imagen);
                icon.setAttribute('src', img)
            });
        }   
        let text = contCircle.appendChild(document.createElement('div'));
            text.setAttribute('class', 'num')
            text.textContent=data.skills[i].porcentaje;
        let span = text.appendChild(document.createElement('span'));
            span.textContent='%';
        let circle = contCircle.appendChild(document.createElement('div'));
            circle.setAttribute('class', 'circle');
        let barLeft = circle.appendChild(document.createElement('div'));
            barLeft.setAttribute('class', 'bar left');
        let progress = barLeft.appendChild(document.createElement('div'));
            progress.setAttribute('class','progress')
        let barRight = circle.appendChild(document.createElement('div'));
        barRight.setAttribute('class', 'bar right');
            progress = barRight.appendChild(document.createElement('div'));
            progress.setAttribute('class','progress');
            animarRight(i,data.skills[i].porcentaje);
        text = contCircle.appendChild(document.createElement('div'));
            text.setAttribute('class', 'text')
            text.textContent=data.skills[i].titulo;
    };
})
.catch(error => {
    console.log('Error : ');
    console.log(error);
});

function animarRight(i, porcentaje){
    let count = 0;
    let fixed = 0;
    if(porcentaje <= 50){
        fixed = 90;
    }else if(porcentaje <= 75){
        fixed = 45;
    }
    setInterval(() => {
        if(count === parseInt(porcentaje)){
            clearInterval();
        }else{
            count++
            document.querySelectorAll('.num')[i].innerHTML = `${count}<span>%</span>`;
        };
    }, 80);
    setTimeout(() => {
        document.querySelectorAll('.right .progress')[i].style=`transform: rotate(${((porcentaje / 100) * 180) - fixed}deg)`;
    }, 4000);
}
// >>>>> -->>>>> ----- form colors ----- <<<<<-- <<<<<
document.querySelector('#form').addEventListener('change', e => {
    
    document.querySelectorAll('.codeColor')[0].textContent=document.querySelectorAll('.input')[0].value;
 
    document.querySelectorAll('.codeColor')[1].textContent=document.querySelectorAll('.input')[1].value;
     
    document.querySelectorAll('.codeColor')[2].textContent=document.querySelectorAll('.input')[2].value;

    document.querySelectorAll('.codeColor')[3].textContent=document.querySelectorAll('.input')[3].value;

    document.querySelectorAll('.codeColor')[4].textContent=document.querySelectorAll('.input')[4].value;
    
    document.body.style=`
        --color1: ${document.querySelectorAll('.input')[0].value};
        --color2: ${document.querySelectorAll('.input')[1].value};
        --colorMedio:${document.querySelectorAll('.input')[2].value};
        --textoClaro:${document.querySelectorAll('.input')[3].value};
        --textoOscuro:${document.querySelectorAll('.input')[4].value};
    `;
    for(let i = 0; i < document.querySelectorAll('.title').length; i++){
        document.querySelectorAll('.title')[i].style.color=document.querySelectorAll('.input')[3].value+'E6';
    };
    document.querySelector('.title__aside').style.color=document.querySelectorAll('.input')[3].value+'B3';
    document.querySelector('.subtitle__profesion').style.color=document.querySelectorAll('.input')[3].value+'B3';
    document.querySelector('.curriculum').style.color=document.querySelectorAll('.input')[4].value+'B3';
    for(let i = 0; i < document.querySelectorAll('.link__btn').length; i++){
        document.querySelectorAll('.link__btn')[i].style.color=document.querySelectorAll('.input')[3].value+'B3';
    };
    for(let i = 0; i < document.querySelectorAll('.link__redesSociales').length; i++){
        document.querySelectorAll('.link__redesSociales')[i].style.color=document.querySelectorAll('.input')[3].value+'B3';
    };
}); 
