import {validation} from './validaciones.js';

$(document).ready(function () {

    //Esconder mensajes de error en cuenta
    $('#error-correo').hide();
    $('#error-tel').hide();
    $('#error-contraseña').hide();
    $('#error-notEqualPasswords').hide();

    //Esconder mensajes de error en index
    $('#error-identificacionOficial').hide();
    $('#error-CURP').hide();
    $('#error-comprobanteDomicilio').hide();
    $('#error-motivoConsulta').hide();
    $('#error-previoMasto').hide();
    $('#error-previoUsg').hide();
    $('#error-biopsia').hide();

    // Inicializar plug in tooltipster
    $('.questionMark').tooltipster({
        theme: 'tooltipster-shadow',
        delay: '140'
    });

    $('[data-toggle="tooltip"]').tooltipster({
        theme: 'tooltipster-shadow',
        delay: '140'
    });

    $('#biopsiaContenedor').hide();
    $('#biopsiaQuestion').hide();


    //Reemplazar el nombre del archivo en el input
    $('body').on('change', '.custom-file-input', function () {
        $(this).next('.custom-file-label').addClass("selected").html($(this).val());
    });

    //Esconder menu lateral a presionar click en el menu hamburguesa
    $('#sidebarCollapse').on('click', () => {
        $('#sidebar, #content').toggleClass('active');
        $('.collapse.in').toggleClass('in');
        $('a[aria-expanded=true]').attr('aria-expanded', 'false');
    });

    $("#motivoConsulta").on('change', () => {

        var motivo = $('#motivoConsulta').val();
        console.log(motivo);

        switch (motivo) {
            case "Me envió un médico":
                $('#documentoAdjuntoMotivo').html("");
                $('#otroHospital').html("");
                $('#estudioMotivo').html("");

                var referencia =
                    '<div class="col-3 text-center">'
                    + '<span class="textoDocumento">Referencia</span>'
                    + '</div>'
                    + '<div class="custom-file col-8" id="customFile">'
                    + '<input type="file" class="custom-file-input" multiple="multiple" aria-describedby="fileHelp">'
                    + '<label class="custom-file-label">'
                    + 'Adjunta la hoja de referencia de médico.'
                    + '</label>'
                    + '</div>';

                $('#documentoAdjuntoMotivo').html(referencia);
                break;
            case "Me envían de otro hospital":

                $('#documentoAdjuntoMotivo').html("");
                $('#otroHospital').html("");
                $('#estudioMotivo').html("");

                var otroHospital =
                    '<div class="col-3 text-center">'
                    + '<span class="textoDocumento">Hospital</span>'
                    + '</div>'
                    + '<div class="custom-file col-8 p-0 m-0" id="customFile">'
                    + '<input type="text" class="form-control" placeholder="Introduce tu hospital de procedencia">'
                    + '</div>';

                var referencia =
                    '<div class="col-3 text-center">'
                    + '<span class="textoDocumento">Referencia</span>'
                    + '</div>'
                    + '<div class="custom-file col-8" id="customFile">'
                    + '<input type="file" class="custom-file-input" multiple="multiple" aria-describedby="fileHelp">'
                    + '<label class="custom-file-label">'
                    + 'Adjunta la hoja de referencia de médico del hospital.'
                    + '</label>'
                    + '</div>';
                ;
                $('#documentoAdjuntoMotivo').html(referencia);
                $('#otroHospital').html(otroHospital);
                break;
            case "Otro":
                console.log("OTRO");
                $('#documentoAdjuntoMotivo').html("");
                $('#otroHospital').html("");
                $('#estudioMotivo').html("");

                var otroHospital =
                    '<div class="col-3 text-center">'
                    + '<span class="textoDocumento">Otro motivo</span>'
                    + '</div>'
                    + '<div class="custom-file col-8 p-0 m-0" id="customFile">'
                    + '<input type="text" class="form-control" placeholder="Introduce otro motivo">'
                    + '</div>';

                $('#otroHospital').html(otroHospital);
                break;
            case "Estudio con diagnóstico de cáncer de mama":
                $('#documentoAdjuntoMotivo').html("");
                $('#otroHospital').html("");
                $('#estudioMotivo').html("");

                var estudio =

                    '<div class="col-3 text-center">'
                    + '<span class="textoDocumento">Estudios previos</span>'
                    + '</div>'

                    + '<div class="custom-file col-8" id="customFile">'
                    + '<input type="file" class="custom-file-input" multiple="multiple" aria-describedby="fileHelp">'
                    + '<label class="custom-file-label">'
                    + 'Elegir archivos...(Puedes subir mas de uno)'
                    + '</label>'
                    + '</div>'

                    + '<div class="col-1 iconoQuestion align-self-center">'
                    + '<a href="#" class="questionMark" data-tooltip-content="#tooltip_content2"><i'
                    + 'class="fas fa-question-circle"></i></a>'
                    + '</div>'

                    + '<div class="tooltip_templates">'
                    + '<span id="tooltip_content2">'
                    + 'Puedes subir mas de un archivo'
                    + '</span>'
                    + '</div>';

                $('#estudioMotivo').html(estudio);
                break;
            default:
                console.log("default");
                break;
        }
    });

    //Checkbox biopsia
    $('#biopsiaInput').on('change', () => {

        var tieneBiopsia = $('#biopsiaInput').is(':checked') ? 1 : 0;

        switch (tieneBiopsia) {
            case 1:
                $('#biopsiaContenedor').show();
                $('#biopsiaQuestion').show();
                break;
            case 0:
                $('#biopsiaContenedor').hide();
                $('#biopsiaQuestion').hide();
                break;
        }
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

    //2.- Telefono
    $('#telephoneNum').on('change', function(){
        if(validation.isValidPhoneNumber($('#telephoneNum'))){
            $('#error-tel').hide();
        }else{
            $('#error-tel').show();
        }
    }); 

     //3.- Contraseña
     $('#password').on('change', function(){
        if(validation.isValidBloodType($('#password'))){
            $('#error-contraseña').hide();
        }else{
            $('#error-contraseña').show();
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

    //1.- Identificación oficial
    $('#fileIdentificacion').on('change', function(){
        if(validation.validDocument($('#fileIdentificacion'))){
            $('#error-identificacionOficial').hide();
        }else{
            $('#error-identificacionOficial').show();
        }
    }); 

    //2.- CURP
    $('#fileCURP').on('change', function(){
        if(validation.validDocument($('#fileCURP'))){
            $('#error-CURP').hide();
        }else{
            $('#error-CURP').show();
        }
    }); 

    //3.- Comprobante de docimicilio
    $('#fileComprobanteDomicilio').on('change', function(){
        if(validation.validDocument($('#fileComprobanteDomicilio'))){
            $('#error-comprobanteDomicilio').hide();
        }else{
            $('#error-comprobanteDomicilio').show();
        }
    }); 

    //4.- Motivo de consulta
    $('#motivoConsulta').on('change', function(){
        if(validation.isValidSelect($('#motivoConsulta'))){
            $('#error-motivoConsulta').hide();
        }else{
            $('#error-motivoConsulta').show();
        }
    }); 

    //5.- Estudios previos masto
    $('#fileEstudioPrevioMasto').on('change', function(){
        if(validation.validDocument($('#fileEstudioPrevioMasto'))){
            $('#error-previoMasto').hide();
        }else{
            $('#error-previoMasto').show();
        }
    }); 

    //6.- Estudios previos usg
    $('#fileEstudioPrevioUsg').on('change', function(){
        if(validation.validDocument($('#fileEstudioPrevioUsg'))){
            $('#error-previoUsg').hide();
        }else{
            $('#error-previoUsg').show();
        }
    }); 

    //7.- Biopsia previa
    $('#fileEstudioBiopsia').on('change', function(){
        if(validation.validDocument($('#fileEstudioBiopsia'))){
            $('#error-biopsia').hide();
        }else{
            $('#error-biopsia').show();
        }
    });

    


});