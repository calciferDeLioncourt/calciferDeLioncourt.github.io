jQuery(document).on('submit', '#f_add_carrito', function(event){
    event.preventDefault();
    
    jQuery.ajax({
        url:'controller/add_carrito.php',
        type: 'POST',
        //dataType: 'json',
        data: $(this).serialize(),
        cache:'false',
        beforeSend:function(){
            $('.target').html('<i class="fas fa-cart-plus"></i> Agregando...');
        },
        success:function(data){
            $('.target').html('<i class="fas fa-cart-plus"></i> Agregar a Carrito');
            if(data=='1'){
                $('body').html('<div class ="modal center"><div class="contenedor__modal center"><p>¡Exito! </br> Agregaste Un Producto A Tu Carrito </p><p><i class="far fa-kiss-wink-heart"></i></p></div></modal>');
                setTimeout(function(){
                    window.history.go(-1);
                },1500);
            }else{
                $('#respuesta').css("display","block");
                $('#respuesta').html('<p class="error">No agregado :( posiblemente se agoto</p></br></br>');
                $('.target').html('<i class="fas fa-cart-plus"></i> Fallo :(');
            }      
        }
    })
});