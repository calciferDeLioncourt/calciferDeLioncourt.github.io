<?php
    session_start();
    include("controller/controller.php");
    include("controller/conexion.php");
    if(isset($_SESSION['usertds'])){
        if(!isset($_GET['user'])){
            header('Location: home');
        }else{
            if($_SESSION['usertds']['nivel'] != "n_01"){
                $user = $_SESSION['usertds']['id_user'];
            }else{
                $user = $_GET['user'];
            }
        }
    }else{
        header('Location: home');
    }

?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title><?php echo $title_pag ?></title>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1, maximum-scale=1, minimum-scale=1">
    <link href="https://vjs.zencdn.net/7.8.3/video-js.css" rel="stylesheet" />
    <link rel="stylesheet" href="css/styles.css?ver=<?php echo VERSIONCSS ?>">
    <script
        src="https://code.jquery.com/jquery-3.4.1.min.js"
        integrity="sha256-CSXorXvZcTkaix6Yvo6HppcZGetbYMGWSFlBw8HfCJo="
        crossorigin="anonymous">
    </script>
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.2.0/css/all.css" integrity="sha384-hWVjflwFxL6sNzntih27bfxkr27PmbbK/iSvJ+a4+0owXq79v+lsFkW54bOGbiDQ" crossorigin="anonymous">
    <script src="js/main.js?ver<?php echo VERSIONJS ?>"></script>
    <meta name="theme-color" content="<?php echo H_COLOR?>"/>
    
</head>
<body>
    <input type="hidden" id="id" value="<?php echo $user ?>">
    <?php
        include("sections/header.php");
    ?>
   <section class="section_box-principal">
       <article class="center contenido__principal">
            <div class="contenedor__boton">
                <a href="?user=<?php echo $user ?>&ver=compras" class="boton">
                    <span class="texto__boton">Compras</span>
                </a>
                <a href="?user=<?php echo $user ?>&ver=extras" class="boton">
                    <span class="texto__boton">Extras</span>
                </a>
            </div>
            <h2 class="title__sub center">¡Bienvenido <span><?php echo $_SESSION['usertds']['user'] ?></span>!</h2>
            <?php
            if($_GET['ver'] == "extras"){
            ?>
            <div class="contenedor__img center" id="index"></div>
            <script src="js/contenido.js"></script>
            <?php }elseif($_GET['ver'] == "compras"){ ?>
            <div class="contenedor__img__perfil center" id="index">
                <p class="title_perfil">Compras Anteriores</p>
                <?php
                    $query_ticket = ("SELECT * FROM $tabla_4 WHERE id_user = '$user' ORDER BY id_ticket DESC");
                    $resultado_ticket = $conexion->query($query_ticket);
                    while($registro_ticket = $resultado_ticket->fetch_assoc()){
                ?>
                <div class="cont__ticket item_ticket">
                    <div class="tabla_ticket" >
                        Ticket : <a href="ticket.php?user=<?php echo $user ?>&ticket=<?php echo $registro_ticket['no_ticket'] ?>"><?php echo $registro_ticket['no_ticket'] ?></a><br>
                    </div>
                    <div class="open-arrow">
                        <i class="fas fa-chevron-down arrow"></i>
                    </div>
                    <div class="tabla_ticket opciones">
                        Status : <?php echo $registro_ticket['status'] ?><br>
                        Pago por : <?php echo $registro_ticket['f_pay'] ?><br>
                        No. Guia : <?php echo $registro_ticket['no_guia'] ?>
                    
                    <?php
                        if($registro_ticket['status'] == "Pendiente de Pago"){
                    ?>
                        <form action="controller/validar.php" method="post" enctype="multipart/form-data">
                           <input type="hidden" name="tk" id="tk" value="<?php echo $registro_ticket['no_ticket'] ?>">
                            <label for="" class="img_name">No Se Ha Seleccionado Imagen</label>
                            <input type="file" name="img_ticket" class="file" id="file-<?php echo $registro_ticket['no_ticket'] ?>">
                            <div class="contenedor__boton">
                                <label for="file-<?php echo $registro_ticket['no_ticket'] ?>" class="boton">
                                    <span class="texto__boton">Seleccionar Imagen</span>
                                </label>
                            </div>
                            <input type="submit" name="enviar_comp" id="enviar_comp-<?php echo $registro_ticket['no_ticket'] ?>">
                            <div class="contenedor__boton">
                                <label for="enviar_comp-<?php echo $registro_ticket['no_ticket'] ?>" class="boton">
                                    <span class="texto__boton">Enviar ticket</span>
                                </label>
                            </div>
                        </form>
                    <?php
                        }
                    ?>
                    <div class="contenedor__boton">
                            <div class="boton" onclick="del_item_user_<?php echo $registro_ticket['id_ticket'] ?>();">
                                <div class="texto__boton"><i class="far fa-trash-alt"></i></div>
                            </div>
                        </div>
                        <script>
                            $(function(){
                                $('.file').on('change',function(){
                                    if($(this)[0].files[0]){
                                        $(this).prev().text($(this)[0].files[0].name);
                                    }
                                })
                            })
                        </script>
                         <script>
                            function del_item_user_<?php echo $registro_ticket['id_ticket'] ?>(){
                                let r = confirm('Eliminar Item <?php echo $registro_ticket['no_ticket'] ?>');
                                if(r == true){
                                    window.location.href="controller/delItem.php?id=<?php echo $registro_ticket['id_user']; ?>&no_ticket=<?php echo $registro_ticket['no_ticket'] ?>&delItem";
                                }else{
                                    return false;
                                }
                            }
                        </script>
                    </div>
                </div>
                <?php
                    }
                ?>
            </div>
            <script>
                $('.item_ticket').on('click','.open-arrow',function(){
                    var t = $(this);
                    var tp = t.next();
                    var p = t.parent().siblings().find('.opciones');
                    tp.slideToggle();
                    p.slideUp();
                });
                $('.open-arrow').click(function(){
                    var arrow = $('.arrow');
                    var t = $(this);
                    var p = t.parent().siblings().find('.arrow');
                    arrow.toggleClass('reverse'); 
                    p.removeClass('reverse');

                })
            </script>
            <?php 
                }
            ?>
       </article>
   </section>
    <?php
        include("sections/botonera.php");
        include("sections/modal.php");
        if(isset($_GET['notif'])){
            include("controller/notif.php");
        }
    ?>
    <script src="https://vjs.zencdn.net/7.8.3/video.js"></script>
</body>
</html>