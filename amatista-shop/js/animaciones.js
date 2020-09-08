function animarLetras(contenedor,efect,time){
    if(efect === 'machine' || efect === 'dance'){
        separarLetras(contenedor);
    };
    let parrafo = contenedor.querySelectorAll('.letra__animate');
    for(let i = 0; i < parrafo.length; i++){
        if(efect === 'machine'){
            setTimeout(() => {
                parrafo[i].style.opacity='1';
            }, time * i);
        }else if(efect === 'dance'){
            parrafo[i].style = `animation: texto ${time}s ease-in-out ${0.1 * i}s infinite`;
            setTimeout(() => {
                parrafo[i].style.animation="";
            }, time * 1000);
        };
    };
    function separarLetras(palabra){
        let contPalabra = palabra.textContent;
        contPalabra = contPalabra.replace(/\s/g, '~');
        let p = [contPalabra];
        palabra.innerHTML="";
        for(let $p of p[0]){
            let letra;
            if($p === "~"){//alt + 126
                letra = palabra.appendChild(document.createElement('span'));
                letra.setAttribute('class', 'letra__animate space');
                letra.innerHTML += '';
            }else if($p === "Ç"){//alt + 128
                letra = palabra.appendChild(document.createElement('br'));
            }else{
                letra = palabra.appendChild(document.createElement('span'));
                letra.setAttribute('class', 'letra__animate');
                letra.innerHTML += $p;
            };
        };
    };
};