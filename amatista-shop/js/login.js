const fLogin = document.querySelector('#f_login'),
    target = document.querySelector('.target'),
    user = document.querySelector('#user'),
    pass = document.querySelector('#pass');

fLogin.addEventListener('submit', e=> {
    e.preventDefault();
    if(user.value === "" || pass.value === ""){
        notificar('fail','El usuario y la contraseña <br>son obligatorios para entrar');
        return false;
    }
    let datos = new FormData(fLogin);
    
    fetch('controller/manejador.php', {
        method: 'post',
        body: datos
    })
    .then(res => {
        if(res.ok){
            target.innerHTML='Entrando...';
            return  res.json();
        }
    })
    .then(data => {
        target.innerHTML='Entrar';
        if(data === "ok"){
            notificar(data,'Bienvenido!')
            setTimeout(() => {
                window.location.reload();
            }, 1500);
        }else{
            notificar(data,data)
        }
    })
    .catch(error => {
        console.log('Error : ');
        console.log(error);
    });
    
});