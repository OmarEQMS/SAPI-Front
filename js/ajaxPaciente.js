$(document).ready(function () {

    

    //REGISTRAR CITA
    $('#btn-citaRegistrar').on('click', () => {
        
        $.ajax({
            url: ''/*VACIO POR EL MOMENTO*/,
            cache: false,
            method: 'POST',
            data: {
                key: '',//FALTA DEFINIR 'key', PUEDE SER "registrar",
                fecha: $('#RegistrarCita_fecha').val(),
                hora: $('#RegistrarCita_hora').val(),
                tipo: $('#RegistrarCita_tipo').val(),
                medico: $('#RegistrarCita_medico').val(),
                
            }
        })
        .done(function (response) {
            console.log(response);
        });


         //CERRAR MODAL
        //$('#modalAgregarCita').modal('toggle')
    });

    // $('#feedbackEdAntiguo').hide();
    // $('#feedbackEdTorre').hide();
    // $('#pisosDiv').hide();

    // $('#EdAntiguo').on('mouseover', function() {
    //     $('#feedbackEdAntiguo').show();
    //     $('#feedbackEdAntiguo').disabled = true;
    // });
    // $('#feedbackEdAntiguo').on('mouseout', function() {
    //     $('#feedbackEdAntiguo').hide();
    // });

    // $('#EdTorre').on('mouseover', function() {
    //     $('#feedbackEdTorre').show();
    // });
    // $('#feedbackEdTorre').on('mouseout', function() {
    //     $('#feedbackEdTorre').hide();
    // });

    
    // $('input:radio[name=Edificios]').change(function() {
    //     if (this.value == 'Edificio antiguo') {
    //         $('#pisosDiv').hide();
    //     }
    //     else if (this.value == 'Torre de nueva hospitalización') {
    //         $('#pisosDiv').show();
    //     }
    // });
    
});