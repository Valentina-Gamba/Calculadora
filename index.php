<?php
    $op = $_REQUEST['op'];
    if(isset($_POST['num1']) or isset($_POST['num2'])){
        $num1 = $_POST['num1'];
    $num2 = $_POST['num2'];
    }
    $resultado = 0;

    switch ($op) {    
        case 'suma':
            $respuesta = $num1 + $num2;
            sql($num1, $num2, $respuesta, $op);
            echo $respuesta;
        break;
        
        case 'resta':
            $respuesta = $num1 - $num2;
            sql($num1, $num2, $respuesta, $op);
            echo $respuesta;
        break;
        
        case 'multiplicacion':
            $respuesta = $num1 * $num2;
            sql($num1, $num2, $respuesta, $op);
            echo $respuesta;
        break;
        
        case 'division':
            $respuesta = $num1 / $num2;
            sql($num1, $num2, $respuesta, $op);
            echo $respuesta;
        break;

        case 'tabla':
            $tabla = tabla();
            echo json_encode($tabla);
        break;
    }    

    function sql($num1, $num2, $result, $operacion){
        $conexion = pg_connect("host=ec2-44-197-128-108.compute-1.amazonaws.com 
        dbname=d1bpebk374vdnh user=nrfrxmzxbttscc 
        password=142f9a26bc3b7e18c426afa00343c1aad847cff14db5931ce525c776db66ed91");
    
        $query = "INSERT INTO operaciones(num1, num2, resultado, operacion, fecha) VALUES('".$num1."','".$num2."','".$result."','".$operacion."','".date("Y-m-d")."')";
        
        $consulta = pg_query($conexion, $query);
    }
    
    function tabla(){
        $resp = []; 
        $cont = 0;
        $conexion = pg_connect("host=ec2-44-197-128-108.compute-1.amazonaws.com 
        dbname=d1bpebk374vdnh user=nrfrxmzxbttscc 
        password=142f9a26bc3b7e18c426afa00343c1aad847cff14db5931ce525c776db66ed91");
    
        $tabla = "SELECT * FROM operaciones ORDER BY fecha ASC";
        $consul = pg_query($conexion, $tabla);

        while($obj=pg_fetch_object($consul)){
            array_push($resp, array(
                'num1' => $obj->num1,
                'operacion' => $obj->operacion,
                'num2' => $obj->num2,
                'resultado' => $obj->resultado,
                'fecha' => $obj->fecha
            ));
        }

        return $resp;
    }
?>
