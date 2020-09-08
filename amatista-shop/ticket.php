<?php
    session_start();
    include('controller/controller.php');
    if(isset($_SESSION['usertds'])){
        if(!isset($_GET['user']) && !isset($_GET['ticket'])){
            header('Location: home');
        }else{
            $no_ticket = $_GET['ticket'];
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
<html>
<head>
    <title>Correo De Compra</title>
    <style>
        * {
            margin:0;
            padding0;
            box-sizing:border-box;
            font-family: monospace;
            text-transform: uppercase;
        }
        th{
            width: 16.6%;
        }
        td{
            font-size: .7em;
        }
    </style>
</head>
<body>
    <?php
        include('controller/conexion.php');
        //echo $user.'<br>'.$no_ticket;
        $query_user=("SELECT * FROM $tabla_2 WHERE id_user = '$user'");
        $resultado_user= $conexion->query($query_user);
        $registro_user = $resultado_user->fetch_assoc();
    //print_r($_GET);
        $query_ticket=("SELECT * FROM $tabla_4 WHERE no_ticket = '$no_ticket'");
        $resultado_ticket= $conexion->query($query_ticket);
        $registro_ticket = $resultado_ticket->fetch_assoc();

        $fecha = $registro_ticket['fecha_ticket'];
        $hora = $registro_ticket['hora_ticket'];
        $f_pay = $registro_ticket['f_pay'];

        $ticket = "========================== id.Ticket:".$no_ticket." ===========================";
        $idUser = $registro_user['id_user'];
        $nombreUser = $registro_user['nombre_envio'];
        $mailUser = $registro_user['email'];
        $calleUser = $registro_user['calle'];
        $coloniaUser = $registro_user['colonia'];
        $delegacionUser = $registro_user['delegacion'];
        $cpUser = $registro_user['cp'];
        $infExtraUser = $registro_user['senas'];
        $telUser = $registro_user['tel'];
        $para = $mailUser.',';
        $para .= $email_pag_mask;
        $suma = "0.00";
        $envio = "150";

        $direccion = "Calle ".$calleUser.", Colonia: ". $coloniaUser.", Delegacion: ". $delegacionUser.", c.p. ". $cpUser.", Inf. Extra: ". $infExtraUser;

        $destino= $mailUser;
        $asunto = $title_pag_mask;
    ?>
    <h1 style='background:teal;color:white;text-align:right;padding:0 15px;width:600px;'><?php echo $title_pag_mask; ?></h1>
    <section style='padding:5px 10px;width:600px;'>
        <?php
            echo"=================================================================================";
            echo "<br>================== Este Documento No Es Un Comprobante de Pago ==================<br>";
            echo"=================================================================================<br><br>";
            echo"
            Fecha : ".$fecha."<br>
            Hora : ".$hora."<br>
            Cliente : ".$nombreUser."<br />";
            echo"Datos de Envio<br>";
            echo "Se enviara a : ".$direccion;
            echo "<br><br>".$ticket."<br /><br>";
            echo"<table style='width:600px;'>
                    <thead>
                        <tr>
                            <th>Cantidad</th>
                            <th>id</th>
                            <th>Nombre del Producto</th>
                            <th>Marca</th>
                            <th>Descripcion</th>
                            <th>Precio</th>
                        </tr>
                    </thead>";
        
            $query_carrito=("SELECT * FROM $tabla_3 WHERE no_ticket = '$no_ticket' ");
            $resultado_carrito= $conexion->query($query_carrito);
            
            while ($registro_carrito = $resultado_carrito->fetch_assoc()) {
                $id_item = $registro_carrito['id_item'];
                $query_item=("SELECT * FROM $tabla_1 WHERE id = '$id_item'");
                $resultado_item= $conexion->query($query_item);
                $registro_item = $resultado_item->fetch_assoc();
                echo "<tr>
                    <td>1</td>
                    <td>SKU: ".$registro_carrito['id_item']."</td>
                    <td>recorte muestra</td>
                    <td>s/n</td>
                    <td>s/n</td>
                    <td>$ ".$registro_item['precio']." mxn</td>
                    </tr>";
                $res = $registro_item['precio'];
                $suma = $res + $suma;
                };
        echo "<tr>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td>--------------</td>
                <td>--------------</td>
            </tr>";
            echo "<tr>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td>sub Total:</td>
                <td>$ ".$suma." mxn</td>
            </tr>";
            echo "<tr>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td>Envio:</td>
                <td>$ ".$envio." mxn</td>
            </tr>";
            $total = $suma + $envio;
            echo "<tr>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td>Total:</td>
                <td>$ ".$total." mxn</td>
            </tr>";
            echo "</table>";
            echo "<br>".$ticket."<br /><br>";
            echo"Opcion de Pago : ";
                if($f_pay == 'azteca'){
                    echo "Pago En Azteca <br>Para : Alberto E. Hernández Cruz<br> Cuenta : 34341397372481<br>Clabe : 127180013973724818<br>";
                }elseif($f_pay == 'bancomer'){
                    echo "Pago En Bancomer <br>Para : Alberto E. Hernández Cruz<br> Cuenta : 1577385110 <br>Clabe : 012180015773851104<br>*** Tambien Puedes Paga En OXXO Tarjeta Bancomer 4152313421684544 ***<br><br>";
                }elseif($f_pay == 'pay-pal'){
                    echo "Pago En Banco Pay-Pal";
                }
                echo "<p style='text-align: center;'>-----> *** Total a pagar: $ ".$total." mxn *** <-----</p><br>
                <br>".$ticket."<br /><br>";
            echo"=================================================================================";
            echo"<br>============================= **** Importante **** ==============================<br>";
            echo"=================================================================================<br><br>";
            echo"Cuando hayas realizado tu pago porfavo avisanos en <a href='mailto:".$email_pag_mask."'>".$email_pag_mask."</a> para enviar tu paquete y no olvides anexar foto del baucher de pago.<br><br>";
            echo "Cualquier duda o comentario no dudes en comunicarte con nosotros a nuestro <a href='mailto:".$email_pag_mask."'>correo</a>
            <br />";
            echo"<br><br>=================================================================================";
            echo"<br>============================= Gracias por tu compra =============================<br>";
            echo"=================================================================================";
        ?>
        <a href='javascript: window.history.back();'style='background:teal;text-decoration:none;color:white;padding:5px;width:150px;display:block;border-radius:50px;text-align:center;margin-top:50px;'>Ok</a>
    </section>
</body>
</html>