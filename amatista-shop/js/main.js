
$(document).ready(function(){
    
    $('.cont__menu__btn').click(function(){
        $('.menu__header').slideToggle();
    });
    $('.menu__boton').on('click', function() {
		$(this).toggleClass('open');
    });
    
    // $('section').on('click', function() {
	// 	$('.menu__header').css("display","none");
    // });
    $('#c_login').click(function(){
        $('.modal').addClass('ocultar');
    });
    $('#mod_log').click(function(){
        $('#form_log').removeClass('ocultar');
    });
    $('.cerrar__modal').click(function(){
        $('#notif').addClass('ocultar');
    });
});
