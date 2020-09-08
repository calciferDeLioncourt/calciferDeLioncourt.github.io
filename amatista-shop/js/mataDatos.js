const newTienda = miParametro('tipo'),
    newId = miParametro('id');
let subDom;
if(/(localhost)/i.test( location.origin )){
    subDom = 'amatista-shop-local/';
}else{
    subDom = "";
}
let   myUrl = location.origin+'/'+subDom;

let pageName = 'Amatista Shop',
    pageDescripcion = 'Productos artesanales, hechos en casa con los mejores materiales',
    pageColor = '#ffffff',
    pageImagen = myUrl+'img/'+'amatistaShop.jpg';
if(newTienda != ""){
    newItem();
}else{
    metaDatos();
};
function metaDatos(){
    meta('property','og:','title',pageName);
    meta('property','og:','description',pageDescripcion);
    meta('property','og:','type','website');
    meta('property','og:','url', window.location.href);
    meta('property','og:','image', pageImagen);
    meta('property','og:','site_name',pageName);
    meta('property','og:','price:currency','es');

    meta('name','twitter:','card','product');
    meta('name','twitter:','site','@jizradesign');
    meta('name','twitter:','title',pageName);
    meta('name','twitter:','descripcion',pageDescripcion);
    meta('name','twitter:','creator','@jizradesign');
    meta('name','twitter:','image', pageImagen);

    meta('itemprop','','name',pageName);
    meta('itemprop','','descripcion',pageDescripcion);
    meta('itemprop','','image', pageImagen);
    meta('name','','theme-color',pageColor);

    function meta(name,set,tipo,valor){
        let meta = document.head.appendChild(document.createElement('meta'))
        meta.setAttribute(name,set+tipo);
        meta.setAttribute('content', valor)
    };
};
function newItem(){
    fetch('bd-local/bd.json')
    .then(res => res.json())
    .then(data => {
        if(newTienda === 'joyeria'){
            store = data.joyeria;
        }else{
            store = data.jabones;
        };
        let item = store[0].item.find(idItem=>idItem.id === newId);
        pageImagen = myUrl+'img/'+newTienda+'/'+item.imagen;
        pageDescripcion = item.descripcion;
        pageName = item.nombre;
        metaDatos();
    })
    .catch(error => {
        console.log('Error : ');
        console.log(error);
    });
};
function miParametro(variable){
    let url = location.href;
    if( /(sku-)/i.test( url) ){
        if(variable === 'tipo'){
            url =  url.replace(/.*sku-/,'').replace(/[\d-]/g,'');
        }else if(variable === 'id'){
            url =  url.replace(/\D/g,'');
        }else{
            url = "";
        };
    }else{
        url = "";
    };
    return url;
};
    