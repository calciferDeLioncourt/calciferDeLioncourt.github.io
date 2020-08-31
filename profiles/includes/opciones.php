<?php
include("conexion.php");
if(isset($_GET['n_id'])){

	$nombre_imagen = $_FILES["img"]["name"];
	$nombre_temporal = $_FILES["img"]["tmp_name"];
	$tipo_archivo = $_FILES["img"]["type"];

	$destino = "../imagenes_user/" . $nombre_imagen;

	if ($tipo_archivo == "image/jpeg" || $tipo_archivo == "image/jpg" || $tipo_archivo == "image/png" || $tipo_archivo == "image/JPG" || $tipo_archivo == "image/JPEG" || $tipo_archivo == "image/gif"){
		move_uploaded_file($nombre_temporal, $destino);
	}else{
		echo "El Archivo No Es Una Imagen. </br>";
		exit();
	}

	$conexion->query("INSERT INTO $tabla_1 (id, nombre, cargo, curp, rfc, email, ce, ine, sp, img) VALUES ('','$user_name', '$email','$pass_cifrado','$tipo','$nombre_imagen')");

 	if($conexion){
		header("Location: ../panel.php#n_user?created");
	}else{
		echo "Fallo la Publicaion";
	}
 }elseif(isset($_GET['actualizar'])){
    $query="UPDATE $tabla_1 SET  nombre = 'Alberto Eduardo Hernández Cruz' WHERE ine='2011027332924'";
	$resultado= $conexion->query($query);
	if($resultado){
        echo 'exito';
	}
	else{
		echo "Fallo la Edicion";
	}
}
?>