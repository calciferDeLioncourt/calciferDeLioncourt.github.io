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
            <h2 class="center">Registro</h2>
            <form class="registro__form" action="controller/user.php" method="post">
                <h2>Datos Personales</h2>
                <label for="user">Nombre de Usuario:</label>
                <input type="text" name="user" id="user" placeholder="Usuario" required>
                <label for="email">Email :</label>
                <input type="mail" name="email" id="email" placeholder="Em@il" required>
                <label for="pass">Password :</label>
                <input type="password" name="pass" id="pass" placeholder="Password" required>
                <label for="c_pass">Confirmar Password :</label>
                <input type="password" name="c_pass" id="c_pass" placeholder="Confirmar Password" required>
                <label for="age">Confirmo que soy mayor de edad</label>
                <input type="checkbox" name="age" id="age" required>
                <h2>Direccion De Envio</h2>
                <label for="nombre">Nombre :</label>
                <input type="text" name="nombre" id="nombre" placeholder="Nombre para envio" required>
                <label for="estado" class="etiqueta">Estado :</label>
                <select id="jmr_contacto_estado" name="estado">
                    <option>Selecciona tu estado</option>
                </select>
                
                <label for="delegacion" class="etiqueta">Delegación o Municipio :</label>
                <select id="jmr_contacto_municipio" name="delegacion">
                    <option>Selecciona tu municipio</option>
                </select>
                <label for="cp" class="etiqueta">Código Postal :</label>
                <input type="text" name="cp" id="cp" placeholder="Ej. 05600" required>
                <label for="colonia" class="etiqueta">Colonia :</label>
                <input type="text" name="colonia" id="colonia" placeholder="Ej. Del Valle" required>
                <label for="calle" class="etiqueta">Calle y Numero(exterior) :</label>
                <input type="text" name="calle" id="calle" placeholder="Ej. Siempre Viva" required>
                <label for="infExtra" class="etiqueta">Señas para ubicar el domicilio :</label>
                <textarea type="text" name="infExtra" id="infExtra" placeholder="Ej. Numero Interior, Fachada Naranja, Puerta Negra"></textarea>
                <label for="tel" class="etiqueta">Teléfono :</label>
                <input type="tel" name="tel" id="tel" placeholder="Ej. 5512345678" required>
                <input type="submit" name="registrar" id="registrar">
                <div class="contenedor__boton">
                    <label class="boton" for="registrar">
                        <span class="texto__boton">Registrar</span>
                    </label>
                </div>
                <span>O</span>
                <div class="contenedor__boton">
                    <a class="boton" href="javascript:window.history.back();">
                        <span class="texto__boton">Volver</span>
                    </a>
                </div>
            </form>
            <script src="js/edos.js"></script> 
       </article>
   </section>
    <?php
        include("sections/botonera.php");
    ?>
</body>
</html>