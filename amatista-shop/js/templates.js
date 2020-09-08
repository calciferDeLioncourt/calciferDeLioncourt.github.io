preLoader();
let pages=[{
    "paginas":[
        {
            "name":"Home",
            "url":"home",
            "icon":"fas fa-home"
        },
        {
            "name":"Joyería",
            "url":"catalogo?tienda=joyeria",
            "icon":"fas fa-gem"
        },
        {
            "name":"Jabones",
            "url":"catalogo?tienda=jabones",
            "icon":"fas fa-soap"
        },
        {
            "name":"FAQ",
            "url":"faq",
            "icon":"far fa-question-circle"
        }
    ]
}];
header();
function header(){
    let header = document.querySelector('#header');
    let contHeader = header.appendChild(document.createElement('div'));
        contHeader.setAttribute('class', 'cont__header center');
    if(window.location.pathname === "/amatista-shop-local/" || window.location.pathname === "/amatista-shop-local/home"){   
    }else{
        let back = contHeader.appendChild(document.createElement('div'));
            back.setAttribute('class', 'cont__menu__btn center');
        let linkBack = back.appendChild(document.createElement('a'));
            linkBack.setAttribute('href', 'javascript:window.history.back()');
        let iconBack = linkBack.appendChild(document.createElement('i'));
            iconBack.setAttribute('class', 'far fa-arrow-alt-circle-left');
    };
    let titleHeader = contHeader.appendChild(document.createElement('h1'));
        titleHeader.setAttribute('class', 'titulo__header');
    let linkTitleHeader = titleHeader.appendChild(document.createElement('a'));
        linkTitleHeader.setAttribute('class', 'link__header');
        linkTitleHeader.setAttribute('href','home');
        linkTitleHeader.textContent = 'Amatista Shop';
    let nav = contHeader.appendChild(document.createElement('div'));
        nav.setAttribute('class', 'menu__header center');
    let ul = nav.appendChild(document.createElement('ul'));
    
    for(pagina of pages[0].paginas){
        let li = ul.appendChild(document.createElement('li'));
            li.setAttribute('class', 'item__menu__header center');
        let linkLi = li.appendChild(document.createElement('a'));
            linkLi.setAttribute('class', 'link__menu__header');
            linkLi.setAttribute('href', pagina.url);
            linkLi.textContent=pagina.name;
        let iconLi = linkLi.appendChild(document.createElement('i'));
            iconLi.setAttribute('class', pagina.icon)
    };
    let btnMenu = contHeader.appendChild(document.createElement('div'));
        btnMenu.setAttribute('class', 'cont__menu__btn center');
    let contMenu = btnMenu.appendChild(document.createElement('div'));
        contMenu.setAttribute('class', 'menu__boton menu-11');
    for(let i = 0; i < 6; i++){
        let span = contMenu.appendChild(document.createElement('span'));
            span.setAttribute('class', 'item');
    };
};
function footer(){

};
function share(cont){
    const url = window.location.href,
        share = document.querySelector(cont);
        ;

    let p = share.appendChild(document.createElement('p'));
        p.setAttribute('class', 'title__share');
    let iconShare = p.appendChild(document.createElement('i'));
        iconShare.setAttribute('class', 'fa fa-share');
        p.innerHTML += 'Comparte en tus redes';
    // >>>>> -->>>>> ----- btn facebook ----- <<<<<-- <<<<<
    let link = share.appendChild(document.createElement('a'));
        link.setAttribute('class', '');
        link.setAttribute('target', '_blank');
        link.setAttribute('title', 'Comparte en facebook');
        link.setAttribute('href', 'https://www.facebook.com/sharer/sharer.php?u='+url);
    let iconLInk = link.appendChild(document.createElement('i'));
        iconLInk.setAttribute('class', 'compartir_btn compartir_btn_facebook fa fa-facebook');
    // >>>>> -->>>>> ----- btn twiter ----- <<<<<-- <<<<<
    link = share.appendChild(document.createElement('a'));
        link.setAttribute('class', 'twitter-share-button');
        link.setAttribute('target', '_blank');
        link.setAttribute('title', 'Comparte en twitter');
        link.setAttribute('href', 'https://twitter.com/share');
        link.setAttribute('data-url', url);
        link.setAttribute('data-text', '');
        link.setAttribute('data-via', 'jizraDesign');
    iconLInk = link.appendChild(document.createElement('i'));
        iconLInk.setAttribute('class', 'compartir_btn compartir_btn_twitter fa fa-twitter');
    // >>>>> -->>>>> ----- btn whatsapp ----- <<<<<-- <<<<<
    link = share.appendChild(document.createElement('a'));
        link.setAttribute('class', '');
        link.setAttribute('target', '_blank');
        link.setAttribute('title', 'Comparte en whatsapp');
        link.setAttribute('href', 'whatsapp://send?text=' + url);
    iconLInk = link.appendChild(document.createElement('i'));
        iconLInk.setAttribute('class', 'compartir_btn compartir_btn_whatsapp fa fa-whatsapp')
};
function preLoader(){
    let preloader = document.querySelector('body').appendChild(document.createElement('div'));
        preloader.setAttribute('class','pre__loader center');
    let contPreloader = preloader.appendChild(document.createElement('div'));
        contPreloader.setAttribute('class', 'cont__preloader center');
    let title = contPreloader.appendChild(document.createElement('h1'));
        title.setAttribute('class','title__preloader');
        title.innerHTML = 'Amatista Shop';
    let subTitle = contPreloader.appendChild(document.createElement('h2'));
        subTitle.setAttribute('class','subTitle__preloader');
        subTitle.innerHTML = 'productos artesanales';
    let icon = contPreloader.appendChild(document.createElement('div'));
        icon.setAttribute('class','icon__preloader center');
        icon.innerHTML = '<i class="far fa-gem"></i>';
    let loader = contPreloader.appendChild(document.createElement('div'));
        loader.setAttribute('class','loader');
    for(let i = 0; i < 20; i++){
        let spanLoader = loader.appendChild(document.createElement('span'));
            spanLoader.setAttribute('class','span__loader');
            spanLoader.style = `--i:${i+1}`
    };
    let text = contPreloader.appendChild(document.createElement('p'));
        text.setAttribute('class','text__loader');
        text.textContent = "Cargando pagina";
    window.addEventListener('load', e => {
        document.querySelector('.pre__loader').remove();
    });
};