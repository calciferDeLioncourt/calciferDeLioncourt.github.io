<?php
    session_start();
    include("controller/controller.php");
    include("controller/conexion.php");
    if (isset($_SESSION['usertds'])) {
        $user =  $_SESSION['usertds']['id_user'];
    }else{
        header('Location: home');
    }
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title><?php echo $title_pag ?>o</title>
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
<body>
    <?php
        include("sections/header.php");
    ?>
    <section>
        <article class="center">
        <h2 class="center">Carrito De Compras</h2>
        <div class="contenedor__carrito center">
            <?php
                $suma = "0";
                
                $query_user=("SELECT * FROM $tabla_2 WHERE id_user = '$user'");
                $resultado_user= $conexion->query($query_user);
                $registro_user = $resultado_user->fetch_assoc();
                    
                $query_pedido=("SELECT * FROM $tabla_3 WHERE id_user = '$user' AND status = 'esperando_pago'");
                $resultado_pedido= $conexion->query($query_pedido);
        
                if(mysqli_num_rows($resultado_pedido) <= '0'){
                    header('location: home');
                }
                while($registro_pedido = $resultado_pedido->fetch_assoc()){
                    if($registro_pedido['tipo'] == "fem"){
                        $tipo = "Chica";
                    }else{
                        $tipo = "Chico";
                    }  
            ?>
            <div class="contenedor__item center">
                <div class="item">
                    <p>Fecha de Compra : <?php echo $registro_pedido['fecha_pedido'] ?></p>
                    <p>Tipo de Prenda : <?php echo $tipo ?></p>
                    <?php
                        $id_item = $registro_pedido['id_item'];
                        $query_item=("SELECT * FROM $tabla_1 WHERE id = '$id_item'");
                        $resultado_item= $conexion->query($query_item);
                        $registro_item = $resultado_item->fetch_assoc();
                        $presio = $registro_item['precio'];
                        $suma = $suma + $presio;
                    ?>
                    <p>Precio : $ <?php echo $registro_item['precio'] ?> MXN</p>
                    <div class="contenedor__boton">
                        <div class="boton" onclick="del_item_<?php echo $registro_item['id'] ?>();">
                            <span class="texto__boton">Quitar de Carrito</span>
                        </div>
                    </div>
                    <script>
                        function del_item_<?php echo $registro_item['id']; ?>(){
                            let r = confirm('¿Quitar Prenda?');
                            if(r == true){
                                window.location.href="controller/add_carrito.php?del=item&id=<?php echo $registro_item['id']; ?>&user=<?php echo $registro_user['id_user']; ?>&pedido=<?php echo $registro_pedido['id_pedido']; ?>";
                            }else{
                                return false;
                            }
                        }
                    </script>
                </div>
                <div class="contenedor__imagen">
                    <img src="img/<?php echo $registro_pedido['tipo'] ?>/<?php echo $registro_item['imagen'] ?>" alt="">
                </div>
            </div>
            <?php
                }
            ?>
        </div>
        <div class="contenedor__pagos center">
            <p>Sub total : $ <?php echo $suma; ?> MXN </br>
            Envio : $ 150 MXN </br>
             Total a pagar : $ <?php $envio = "150"; $total = $suma + $envio; echo $total; ?> MXN</p>
            <div class="contenedor__boton">
                <div class="boton">
                    <span class="texto__boton">Opciones de pago</span>
                </div>
            </div>
            <div class="opt_pago center">
                <div class="pago center azteca" onclick="banco('azteca');">
                    <img src="img/baazteca.jpg" alt="banco azteca">
                    <div class="contenedor__boton pago__texto">
                        <div class="boton">
                            <span class="texto__boton">Generar Ticket De Pago</span>
                        </div>
                    </div>
                </div>
                <div class="pago center bancomer" onclick="banco('bancomer');">
                    <img src="img/bancomer.png" alt="bancomer">
                    <div class="contenedor__boton pago__texto">
                        <div class="boton">
                            <span class="texto__boton">Generar Ticket De Pago</span>
                        </div>
                    </div>
                </div>
                <script>
                    function banco(banco){
                        let r = confirm(`¿Quies Generar Un Ticket Para Pagar En Banco ${banco}?`);
                        if(r == true){
                            window.location.href="controller/validar.php?id=<?php echo $user; ?>&f_pay="+banco;
                        }else{
                            return false;
                        }
                    }
                </script>
            </div>
            <div class="tittle__paypal center"><hr>O<hr></div>
        <div class="tittle__paypal"><span>Paga en linea</span></div>
       <div id='paypal-button'></div>
        <?php
            include("controller/pay-pal/paypal.php");
        ?>
        </div>
       
        </article>
    </section>
    <?php        
        include("sections/botonera.php");
        include("sections/modal.php");
        if(isset($_GET['notif'])){
            include("controller/notif.php");
        }
    ?>
</body>
</html>