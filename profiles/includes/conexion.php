<?php

   //Parametros para conexion de la Base de Datos
	/*$host = "localhost";
	$usuario = "jizracom";
	$clave = "l6ic13RFg3";
	$bd = "jizracom_blog";*/
    $host = "localhost";
	$usuario = "root";
	$clave = "";
	$bd = "profiles";
	//Lista de Tablas
	$tabla_1 = "id";

	//error_reporting(0); // No muestra errores

	$conexion = new mysqli($host, $usuario, $clave, $bd);

	if ($conexion->connect_error){
		echo "Nuestro sitio experimenta fallos..";
		die("$conexion->connect_errno: $conexion->connect_error");
	}    
?>