<?php
    session_start();
    include("controller/controller.php");
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title><?php echo $title_pag ?></title>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1, maximum-scale=1, minimum-scale=1">
    <link rel="stylesheet" href="css/styles.css?ver=<?php echo VERSIONCSS ?>">
    <script
        src="https://code.jquery.com/jquery-3.4.1.min.js"
        integrity="sha256-CSXorXvZcTkaix6Yvo6HppcZGetbYMGWSFlBw8HfCJo="
        crossorigin="anonymous">
    </script>
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.2.0/css/all.css" integrity="sha384-hWVjflwFxL6sNzntih27bfxkr27PmbbK/iSvJ+a4+0owXq79v+lsFkW54bOGbiDQ" crossorigin="anonymous">
    <script src="js/main.js?ver=<?php echo VERSIONJS ?>"></script>
    <meta name="theme-color" content="<?php echo H_COLOR?>"/>
</head>
<body class="center">
    <?php
        include("sections/header.php");
    ?>
   <section>
       <article class="center">
            <h2>¿Quines Somos?</h2>
            <?php
                include('controller/conexion.php');
                $query_faq = ("SELECT * FROM faq");
                $respuesta_faq = $conexion->query($query_faq);
                while($registro_faq = $respuesta_faq->fetch_assoc()){
            ?>
            <div class="contenedor_acordeon">
                <h3><?php echo $registro_faq['pregunta'] ?></h3>
                <p class="item_acordeon"><?php echo $registro_faq['respuesta'] ?></p>
            </div>
            <?php } ?>
       </article>
        <script>
            $('.contenedor_acordeon').on('click','h3',function(){
                var t = $(this);
                var tp = t.next();
                var p = t.parent().siblings().find('.item_acordeon');
                tp.slideToggle();
                p.slideUp();
            });
        </script>
   </section>
    <?php
        include("sections/botonera.php");
        include("sections/modal.php");
    ?>
</body>
</html>