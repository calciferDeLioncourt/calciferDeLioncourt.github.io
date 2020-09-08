const tienda = miParametro('tipo'),
    id = miParametro('id'),
    subtitulo = document.querySelector('.title__sub'),
    nombrePza = document.querySelector('.texto__titulo');
tienda === 'joyeria' ? subtitulo.textContent = 'Joyería Artesanal !' : subtitulo.textContent = 'Jabones Artesanales !';
fetch('bd-local/bd.json')
.then(res => res.json())
.then(data => {
    if(tienda === 'joyeria'){
        store = data.joyeria;
    }else{
        store = data.jabones;
    };
    let item = store[0].item.find(idItem=>idItem.id === id);
    fetch(`img/${tienda}/${item.imagen}`)
    .then(res => res.blob())
    .then(img => {
        let imagen = URL.createObjectURL(img);
        document.querySelector('.fondo').src = imagen;
        document.querySelector('.foto').src = imagen;
    });
    if(item.imagenes.length > 0){
        for(let imagenes of item.imagenes){
            let imgs = document.querySelector('#contenedor__imgs__item').appendChild(document.createElement('img'));
                imgs.setAttribute('class', 'foto');
            fetch(`img/${tienda}/${imagenes}`)
            .then(res => res.blob())
            .then(img => {
                let imagen = URL.createObjectURL(img);
                imgs.setAttribute('src', imagen);
            });
        };
    };
    nombrePza.textContent = item.nombre;
    document.querySelector('#descripcion').textContent = item.descripcion;
    document.querySelector('#precio span').textContent = item.precio;
    if(document.querySelector('#f_add_carrito')){
        document.querySelector('#id').value = item.id;
        document.querySelector('#tipo').value = item.tipo;
    };
})
.catch(error => {
    console.log('Error : ');
    console.log(error);
});
function miParametro(variable){
    let url = location.href;
    if(variable === 'tipo'){
        url =  url.replace(/.*sku-/,'').replace(/[\d-]/g,'');
    }else if(variable === 'id'){
        url =  url.replace(/\D/g,'');
    }else{
        url = "";
    };
    return url;
};
setTimeout(() => {
    jdSider('#contenedor__imgs__item','foto','5000');
}, 500);