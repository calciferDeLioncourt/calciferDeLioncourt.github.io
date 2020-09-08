const tel = '525588305654',
    formContacto = document.querySelector('#formContacto'),
    tag = document.querySelector('.texto__titulo');
    
formContacto.addEventListener('submit', e=> {
    e.preventDefault();
    let nombre = document.querySelector('#nombre'),
        mensaje = document.querySelector('#mensaje'),
        miFecha = new Date(),
        year = miFecha.getFullYear(),
        mes = miFecha.getMonth()+1,
        dia = miFecha.getDate(),
        h = miFecha.getHours(),
        m = miFecha.getMinutes(),
        fecha = `*_Fecha :_*${dia}/${mes}/${year}%0A`,
        hora = `*_Hora :_*${h}:${m}`;

    console.log("nombre", nombre.value);
    console.log("mensaje", mensaje.value);
    if (nombre.value === "" || mensaje.value === ""){
        alert('todos los campos son obligatorios');
        return false;
    }
    let apiWhatsap = `https://wa.me/${tel}?text=`,
        encabezados = `*_Amatista Shop_*%0A%0A`,
        thisUrl= window.location.href+'%0A';
    encabezados = encabezados.replace(/\ /g, '%20');
    nombre = `*De : ${nombre.value}*%0A`;
    nombre = nombre.replace(/\ /g, '%20');
    mensaje = `*Consulta :*%0A${mensaje.value}%0A*_Mensaje desde : ${tag.textContent}_*%0A*_URL :_*%0A${thisUrl+fecha+hora}`;
    mensaje = mensaje.replace(/\ /g, '%20');
    
    
    let url = `${apiWhatsap+encabezados+nombre+mensaje}`;
    window.open(url);
    formContacto.reset();
});