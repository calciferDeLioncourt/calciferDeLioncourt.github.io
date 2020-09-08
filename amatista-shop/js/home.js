const linkCategoria = document.querySelectorAll('.link__categoria'),
    contCatalogo = document.querySelectorAll('.contenedor__imgs__catalogo');
let tienda="",arrayTipo=[];

fetch('img/dy.jpg')
.then(res => res.blob())
.then(imagen => {
    let img = URL.createObjectURL(imagen);
    document.querySelector('.img__home').src= img;
});
fetch('img/wedding.jpg')
.then(res => res.blob())
.then(imagen => {
    let img = URL.createObjectURL(imagen);
    document.querySelectorAll('.img__categoria')[0].src= img;
});
fetch('img/soap.jpg')
.then(res => res.blob())
.then(imagen => {
    let img = URL.createObjectURL(imagen);
    document.querySelectorAll('.img__categoria')[1].src= img;
});
document.querySelectorAll('.link__categoria').forEach(cont=>{
    for(let i = 0; i < 4; i++){
        cont.appendChild(document.createElement('span'));
    };
});
for(let i = 0; i < linkCategoria.length; i++){
    linkCategoria[i].addEventListener('mouseover', e => {
        linkCategoria[i].classList.add('hover');
        setTimeout(() => {
            linkCategoria[i].addEventListener('mouseleave', e => {
                linkCategoria[i].classList.remove('hover');
            });
        }, 500);
    });
};
window.addEventListener('load',  e => {
    const //palabra = document.querySelector('.link__header'),
        titleHome = document.querySelector('.title__home'),
        subtitle = document.querySelector('.sub__title');
    // animarLetras(palabra,'dance','2000');
    animarLetras(titleHome,'dance','2');
    setTimeout(() => {
        animarLetras(subtitle,'dance','3')
    }, 1700);
    if(window.innerWidth < 480){
        for(let i = 0; i < linkCategoria.length; i++){
            linkCategoria[i].classList.add('hover');
            linkCategoria[i].style.transform='scale(1)';
        };
    };
});
window.addEventListener('resize',  e => {
    if(window.innerWidth < 480){
        for(let i = 0; i < linkCategoria.length; i++){
            linkCategoria[i].classList.add('hover');
            linkCategoria[i].style.transform='scale(1)';
        };
    }else{
        for(let i = 0; i < linkCategoria.length; i++){
            linkCategoria[i].classList.remove('hover');
            linkCategoria[i].style ='';
        };
    };
});

if(contCatalogo[0]){
    tienda = 'joyeria';
    catalogo(tienda,0);
};
if(contCatalogo[1]){
    tienda = 'jabones';
    catalogo(tienda,1);
};

function catalogo(tienda,index){
    fetch('bd-local/bd.json')
    .then(res => res.json())
    .then(data => {
        if(tienda === 'joyeria'){
            store = data.joyeria;
        }else{
            store = data.jabones;
        };
        for(catalogo of store[0].catalogo){
            arrayTipo.push(catalogo);
        };
        arrayTipo = [...new Set(arrayTipo)]
        constructorTienda(arrayTipo,tienda,index);
    })
    .catch(error => {
        console.log('Error : ');
        console.log(error);
    });
};
function constructorTienda(array,tienda,index){
    if(array.length>=1){
        contCatalogo[index].innerHTML="";
        for(itemArray of array){
            let link = contCatalogo[index].appendChild(document.createElement('a'));
                link.setAttribute('class', 'img');
                link.setAttribute('href', `catalogo?tienda=${tienda}&tipo=${itemArray.tipo}`);
            let imgItem = link.appendChild(document.createElement('img'));
            fetch(`img/${tienda}/catalogo/${itemArray.imagen}`)
            .then(res => res.blob())
            .then(data => {
                let imagen = URL.createObjectURL(data)
                imgItem.setAttribute('src', imagen);
            });
            let title = link.appendChild(document.createElement('p'));
                title.setAttribute('class', 'title__item');
                title.textContent=itemArray.tipo;
        };
        arrayTipo=[];
    };
};