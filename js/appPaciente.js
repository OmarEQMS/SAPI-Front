import {validation} from './validaciones.js';

$(document).ready(function () {

    //Esconder mensajes de error
    $('#error-correo').hide();

    // Inicializar plug in tooltipster
    $('.questionMark').tooltipster({
        theme: 'tooltipster-shadow',
        delay: '140'
    });

    //Reemplazar el nombre del archivo en el input
    $('.custom-file-input').on('change', function () {
        $(this).next('.custom-file-label').addClass("selected").html($(this).val());
    });

    //Esconder menu lateral a presionar click en el menu hamburguesa
    $('#sidebarCollapse').on('click', () => {
        $('#sidebar, #content').toggleClass('active');
        $('.collapse.in').toggleClass('in');
        $('a[aria-expanded=true]').attr('aria-expanded', 'false');
    });



    $("#btn-eliminarSintoma").on('click', function(){
        var id = $(this).data('id');
        console.log(id);

        //Modal borrar sintoma
        swal({
            title: "Estás a punto de eliminar este sintoma:",
            text: "-Dolor Muscular",
            icon: "warning",
            buttons: true,
            buttons: ['Cancelar', 'Aceptar'],
            dangerMode: true,
        })
            .then((eliminar) => {
                if (eliminar) {
                    $.ajax({
                        url: ''/*VACIO POR EL MOMENTO*/,
                        cache: false,
                        method: 'POST',
                        data: {
                            key: '',//FALTA DEFINIR 'key', PUEDE SER "borrar",
                            idSintoma: id
                        }
                    })
                    .done(function (response) {
                        console.log(response);
                    })
                    .fail(function (xhr, textStatus, errorThrown) {
                        console.log(xhr.responseText);
                    });
                } else {

                }
            });

    });

    ///////////////////////////////NAVEGADORAS
    $("#tablaSintomas").DataTable({
        "searching": false,
        responsive: true,
        dom: 'lBfrtip',
        buttons: [

            {
                extend: 'excel',
                text: 'Exportar a Excel',
                className: 'btn-success'
            },
            {
                extend: 'pdf',
                text: 'Exportar a pdf',
                className: 'btn-info'
            }
        ],

        "language": {

            "sProcessing": "Procesando...",
            "sLengthMenu": "Mostrar _MENU_ registros",
            "sZeroRecords": "No se encontraron resultados",
            "sEmptyTable": "Ningún dato disponible en esta tabla",
            "sInfo": "",
            "sInfoEmpty": "Mostrando registros del 0 al 0 de un total de 0",
            "sInfoFiltered": "(filtrado de un total de _MAX_ registros)",
            "sInfoPostFix": "",
            "sSearch": "Buscar:",
            "sUrl": "",
            "sInfoThousands": ",",
            "sLoadingRecords": "Cargando...",
            "oPaginate": {
                "sFirst": "Primero",
                "sLast": "Último",
                "sNext": "Siguiente",
                "sPrevious": "Anterior"
            },
            "oAria": {
                "sSortAscending": ": Activar para ordenar la columna de manera ascendente",
                "sSortDescending": ": Activar para ordenar la columna de manera descendente"
            }

        }

    });

    $('#btnAgregarSintoma').on('click', function () {

        swal({
            html: true, /*Julio, la consola me dijo esto
                        SweetAlert warning: "html" option has been deprecated. Please use "content" instead.*/
            title: "Estas apunto de agregar este sintoma:",
            text: "-Dolor Muscular \n \n Se recomienda poner en contacto con su medico",
            icon: "warning",
            buttons: true,
            buttons: ['Cancelar', 'Aceptar'],
            dangerMode: true,
        })
            .then((agregar) => {
                if (agregar) {
                     $.ajax({
                        url: ''/*VACIO POR EL MOMENTO*/,
                        cache: false,
                        method: 'POST',
                        data: {
                            key: '',//FALTA DEFINIR 'key', PUEDE SER "agregar",
                            /*$('#estadoAnimo').data("idAnimo")*/
                            Animo: $('#estadoAnimo').data("idanimo"),
                            Peso: $('#inputPeso').val(),
                            Pulso: $('#inputPulso').val(),
                            Presion: $('#inputPresion').val(),
                            Glucosa: $('#inputGlucosa').val(),
                            Oxigenacion: $('#inputOxigenacion').val(),
                            Temperatura: $('#inputTemperatura').val()
                            /*FALTAN SLIDERS*/
                        }
                    })
                    .done(function (response) {
                        console.log(response);
                    })
                    .fail(function (xhr, textStatus, errorThrown) {
                        console.log(xhr.responseText);
                    });
                    console.log($('#estadoAnimo').data("idanimo"));
                    console.log($('#inputPeso').val());
                    console.log($('#inputPulso').val());
                    console.log($('#inputPresion').val());
                    console.log($('#inputGlucosa').val());
                    console.log($('#inputOxigenacion').val());
                    console.log($('#inputTemperatura').val());
                } else {

                }
            });

    });


    $('[data-toggle="tooltip"]').tooltipster({
        theme: 'tooltipster-shadow',
        delay: '140'
    });

  

    //AGREGAR Y QUITAR TRATAMIENTOS
    $('#add-Tratamiento').on('click', function(){

        var plantilla = `<div class="form-group row justify-content-center contenedor-tratamientos">
        <div class="col-7">
            <select id="tratamiento" class="form-control">
                <option disabled selected>Elegir Tratamiento</option>
                <option value="">Quimioterapia antes de la cirugía</option>
                <option value="">Quimioterapia después de la cirugía</option>
                <option value="">Radioterapia antes de la cirugía</option>
                <option value="">Radioterapia después de la cirugía</option>
                <option value="">Hormonoterapia antes de la cirugía</option>
                <option value="">Hormonoterapia después de la cirugía</option>
                <option value="">Mastectomía</option>
                <option value="">Cirugía conservadora</option>
                <option value="">Reconstrucción</option>
                <option value="">Paliativo</option>
                <option value="">Ya terminé tratamiento</option>
            </select>
        </div>
            <div class="col-1">
                <button type="button" id="remove-Tratamiento" class="btn btn-outline-danger" style="border-radius: 25px;">
                <i class="fas fa-times"></i>
            </div>

    </div>`;

        $('#tratamientos').append(plantilla);

    });

    $('body').on('click', '#remove-Tratamiento', function(){

        $(this).parent().parent().remove();

    });


    //VALIDACIONES

    //1.- Correo
    $('#myEmail').on('change', function(){
        if(validation.isValidEmail($('#myEmail'))){
            $('#error-correo').show();
        }else{
            $('#error-correo').hide();
        }
    }); 







    

});
