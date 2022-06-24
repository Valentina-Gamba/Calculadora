$(document).ready(function(){
    var campo = 0
    var operacion = ''

    $("#num1").focus(function(){
        campo = 1
    })
    $("#num2").focus(function(){
        campo = 2
    })

    $("#uno").click(function(e){
        e.preventDefault();
        setnumero(1)
    })
    $("#dos").click(function(e){
        e.preventDefault();
        setnumero(2)
    })
    $("#tres").click(function(e){
        e.preventDefault();
        setnumero(3)
    })
    $("#cuatro").click(function(e){
        e.preventDefault();
        setnumero(4)
    })
    $("#cinco").click(function(e){
        e.preventDefault();
        setnumero(5)
    })
    $("#seis").click(function(e){
        e.preventDefault();
        setnumero(6)
    })
    $("#siete").click(function(e){
        e.preventDefault();
        setnumero(7)
    })
    $("#ocho").click(function(e){
        e.preventDefault();
        setnumero(8)
    })
    $("#nueve").click(function(e){
        e.preventDefault();
        setnumero(9)
    })
    $("#cero").click(function(e){
        e.preventDefault();
        setnumero(0)
    })
 
    function setnumero(num){
        let dato = ''
        if (campo == 1){
            dato = $("#num1").val() + num
            $("#num1").val(dato)
        }else if (campo == 2){
            dato = $("#num2").val() + num
            $("#num2").val(dato)
        }else{
            alert('Seleccione un campo para escribir')
        }
    } 

    $("#suma").click(function(e){
        e.preventDefault();
        operacion = 'suma'
        $('#operacion').html('<b>+</b>')
    })
    $("#resta").click(function(e){
        e.preventDefault();
        operacion = 'resta'
        $('#operacion').html('<b>-</b>')
    })
    $("#multiplicacion").click(function(e){
        e.preventDefault();
        operacion = 'multiplicacion'
        $('#operacion').html('<b>X</b>')
    })
    $("#division").click(function(e){
        e.preventDefault();
        operacion = 'division'
        $('#operacion').html('<b>/</b>')
    })

    $("#resultado").click(function(e){ 
        e.preventDefault();
        var continuar = true 
        if (operacion == ''){
            continuar = false
            alert('Seleccione una operacion')
        }
        if ($("#num2").val() == 0){
            continuar = false
            alert('El segundo campo debe ser mayor a 0 para poder realizar la operacion')
        }
        if ($("#num1").val() == ''){
            continuar = false
            alert('El primer campo no puede ir vacio')
        }
        if ($("#num2").val() == ''){
            continuar = false
            alert('El segundo campo no puede ir vacio')
        }
        if (continuar){
            $.ajax({
                url: './index.php?op='+operacion,
                type: 'POST',
                data: {num1: $("#num1").val(), num2: $("#num2").val()},
                success: function(resp){
                    alert('Su resultado es: '+resp)
                }
            })
        }
    })
    

    $('#tabla').on('click', function() {
        $.ajax({
            url: './index.php?op=tabla',
            type: 'GET',
            success: function(resp){
                let dataHtml = ''
                let json = JSON.parse(resp)
                json.forEach(item => {
                    console.log(item)
                    dataHtml += `<tr>
                        <th>`+item.num1+`</th>
                        <th>`+item.operacion+`</th>
                        <th>`+item.num2+`</th>
                        <th>`+item.resultado+`</th>
                        <th>`+item.fecha+`</th>
                    </tr>`
                });

                console.log(dataHtml)

                $("#dataTable").html(dataHtml)
                $("#modelId").show(true)
            }
        })
        
        
    });
})