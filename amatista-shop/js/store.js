const tienda =  getParameterByName('tienda'),
    contItems = document.querySelector('.contenedor__imgs__catalogo'),
    buscador = document.querySelector('#formBuscador'),
    buscar = document.querySelector('#buscar'),
    limpiarBuscador = document.querySelector('#limpiar-buscador'),
    subtitulo = document.querySelector('.title__sub'),
    item = getParameterByName('tipo'),
    buscadorResp = document.querySelector('#resBuscador'),
    textCont =document.querySelector('.texto__contenido');
let arrayTipo=[],store;
tienda === 'joyeria' ? subtitulo.textContent = 'Joyería Artesanal !' : subtitulo.textContent = 'Jabones Artesanales !';
item != '' ? buscar.placeholder='Bucar por pieza': buscar.placeholder='Buscar por nombre generico(ej. aretes, anillos.. etc)';
tienda === 'joyeria' ? textCont.textContent = 'Joyería Artesanal, es la opción que usan muchas personas que buscan algo nuevo, se conoce de esta forma porque no está incluido en ningún catalogo industrial o de empresa de moda o bisutería, están hechas totalmente a mano' : textCont.textContent = 'Un jabón artesanal es un jabón hecho a mano y saponificado en frío. ... El proceso de saponificación en frío garantiza que los jabones mantienen todas sus propiedades, especialmente que los aceites esenciales no pierden sus virtudes terapéuticas ni cosméticas pues no han sido sometidos a calentamiento';

listar();
buscador.addEventListener('submit', e=> {
    e.preventDefault();
});
buscar.addEventListener('keyup', e=> {
    if(buscar.value != ""){
        buscar.classList.add('active');
        search(buscar.value);
    }else{
        buscar.classList.remove('active');
        buscadorResp.textContent ="";
        listar();
    };
});
limpiarBuscador.addEventListener('click', ()=> {
    if(buscar.classList.contains('active')){
        buscar.classList.remove('active');
    };
    buscadorResp.textContent ="";
    buscador.reset();
    listar();
})
function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
    results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
};

function listar(){
    if(item != ""){
        fetch('bd-local/bd.json')
        .then(res => res.json())
        .then(data => {
            if(tienda === 'joyeria'){
                store = data.joyeria;
            }else{
                store = data.jabones;
            };
            for(categoria of store[0].item.filter(stock=>stock.tipo === item)){
                arrayTipo.push(categoria);
            };
            constructorTienda(arrayTipo,item);
        })
        .catch(error => {
            console.log('Error : ');
            console.log(error);
        });
    }else if(tienda != ""){
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
            constructorTienda(arrayTipo,item);
        })
        .catch(error => {
            console.log('Error : ');
            console.log(error);
        });
    };
};
function constructorTienda(array,item){
    if(array.length>=1){
        contItems.innerHTML="";
        // console.log(array);
        for(itemArray of array){
            let link = contItems.appendChild(document.createElement('a'));
                link.setAttribute('class', 'img');
                if(item != ""){
                    link.setAttribute('href', `sku-${itemArray.tienda}-${itemArray.id}`);
                }else{
                    link.setAttribute('href', location.href +`&tipo=${itemArray.tipo}`);
                }
            let imgItem = link.appendChild(document.createElement('img'));
            fetch(item != "" ? `img/${itemArray.tienda}/${itemArray.imagen}`: `img/${tienda}/catalogo/${itemArray.imagen}`)
            .then(res => res.blob())
            .then(data => {
                let imagen = URL.createObjectURL(data)
                imgItem.setAttribute('src', imagen);
            });
            let title = link.appendChild(document.createElement('p'));
                title.setAttribute('class', 'title__item');
            if(item != ""){
                title.textContent=itemArray.nombre;
            }else{
                title.textContent=itemArray.tipo;
            }
        }
        arrayTipo=[];
    };
};

function search(dato){
    contItems.innerHTML="";
    fetch('bd-local/bd.json')
    .then(res => res.json())
    .then(data => {
        if(tienda === 'joyeria'){
            store = data.joyeria;
        }else{
            store = data.jabones;
        };
        if(item != ""){
            let resultado = store[0].item.filter(tipo=>{
                return tipo.nombre.toLowerCase().startsWith(dato.toLowerCase()) || tipo.descripcion.toLowerCase().startsWith(dato.toLowerCase())
            });
            if(resultado.length >= 1){
                resultado.forEach((element, indice) => {
                    arrayTipo.push(element);
                });
                buscadorResp.textContent = `Resultado: ${resultado.length} conicidencias`;
            }else{
                listar();
                buscadorResp.textContent = "No se encontraron coincidencias";
                return
            };
        }else{
            let resultado = store[0].catalogo.filter(tipo=>{
                return tipo.tipo.toLowerCase().startsWith(dato.toLowerCase())
            });
            if(resultado.length >= 1){
                resultado.forEach((element, indice) => {
                    arrayTipo.push(element);
                });
                buscadorResp.textContent = `Resultado: ${resultado.length} conicidencias`;
            }else{
                listar();
                buscadorResp.textContent = "No se encontraron coincidencias";
                return
            };
        };
        arrayTipo = [...new Set(arrayTipo)];
        constructorTienda(arrayTipo,item);
    })
    .catch(error => {
        console.log('Error : ');
        console.log(error);
    });
};