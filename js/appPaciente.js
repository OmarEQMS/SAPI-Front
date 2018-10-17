import {validation} from './validaciones.js';

$(document).ready(function () {

    //Esconder mensajes de error en cuenta
    $('#error-correo').hide();
    $('#error-noExpediente').hide();
    $('#error-tel').hide();
    $('#error-tipoSangre').hide();
    $('#error-notEqualPasswords').hide();

    //Esconder mensajes de error en index
    $('#error-fecha').hide();
    $('#error-tipoCita').hide();
    $('#error-medico').hide();
    $('#error-edificio').hide();
    $('#error-piso').hide();

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


    //VALIDACIONES CUENTA

    //1.- Correo
    $('#myEmail').on('change', function(){
        if(validation.isValidEmail($('#myEmail'))){
            $('#error-correo').hide();
        }else{
            $('#error-correo').show();
        }
    }); 

    //2.- No expediente
    $('#numExpediente').on('change', function(){
        if(validation.isValidNoExpediente($('#numExpediente'))){
            $('#error-noExpediente').hide();
        }else{
            $('#error-noExpediente').show();
        }
    }); 

    //3.- Telefono
    $('#telephoneNum').on('change', function(){
        if(validation.isValidPhoneNumber($('#telephoneNum'))){
            $('#error-tel').hide();
        }else{
            $('#error-tel').show();
        }
    }); 

    //4.- Tipo Sangre
    $('#tipo-sangre').on('change', function(){
        if(validation.isValidBloodType($('#tipo-sangre'))){
            $('#error-tipoSangre').hide();
        }else{
            $('#error-tipoSangre').show();
        }
    });

    //Verificar que las contraseñas son iguales
    $('#password-confirm').on('change', function(){

        areEqualPasswords($('#password'), $('#password-confirm'));

    });

    function areEqualPasswords(pass1, pass2) {

        if (pass1.val() != pass2.val()) {

            pass2.css('border', '1px solid red');
            pass1.css('border', '1px solid red');
            $('#error-notEqualPasswords').show();

            return false;

        } else {

            pass2.css('border', '');
            pass1.css('border', '');
            $('#error-notEqualPasswords').hide();

        }

        return true;
    }

    //VALIDACIONES INDEX

    //1.- Fecha
    $('#RegistrarCita_fecha').on('change', function(){
        if(validation.isValidDate($('#RegistrarCita_fecha'))){
            $('#error-fecha').hide();
        }else{
            $('#error-fecha').show();
        }
    }); 

    //2.- Tipo cita
    $('#RegistrarCita_tipo').on('change', function(){
        if(validation.isValidSelect($('#RegistrarCita_tipo'))){
            $('#error-tipoCita').hide();
        }else{
            $('#error-tipoCita').show();
        }
    });

     //3.- Médico
     $('#RegistrarCita_medico').on('change', function(){
        if(validation.isValidSelect($('#RegistrarCita_medico'))){
            $('#error-medico').hide();
        }else{
            $('#error-medico').show();
        }
    });

     //4.- Edificio
     $('#RegistrarCita_edificio').on('change', function(){
        if(validation.isValidCheckbox($('#RegistrarCita_edificio'))){
            $('#error-edificio').hide();
        }else{
            $('#error-edificio').show();
        }
    });

    //5.- Piso
    $('#RegistrarCita_piso').on('change', function(){
        if(validation.isValidCheckbox($('#RegistrarCita_piso'))){
            $('#error-piso').hide();
        }else{
            $('#error-piso').show();
        }
    });

    

});
