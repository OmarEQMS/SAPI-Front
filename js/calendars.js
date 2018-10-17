$(document).ready(function () {

    $('#calendarCitasPaciente').fullCalendar({
        locale: 'es',
        height: 630,
        themeSystem: 'bootstrap4',
        header: {
            left: 'prev,next today',
            center: 'month,agendaWeek,agendaDay',
            right: 'title'
        },
        eventBackgroundColor: "#eb5865",
        eventBorderColor: "#de1f1f",
        eventLimit: true, // allow "more" link when too many events
        eventClick: function () {

            $('#modalVerCita').modal('toggle');

        },
        dayClick: function (date) {
            $('#modalAgregarCita').modal('toggle');
        },
        events: [
            {
                title: 'Cita Radiologo',
                start: '2018-09-23'
            },
            {
                title: 'Cita Nutriologo',
                start: '2018-08-30'
            }
        ]
    });

    //Cambiar de color los botones del calendario y varios textos
    $('.fc-agendaWeek-button').removeClass('btn-primary').addClass('btn-outline-danger');
    $('.fc-month-button').removeClass('btn-primary').addClass('btn-outline-danger');
    $('.fc-agendaDay-button').removeClass('btn-primary').addClass('btn-outline-danger');
    $('.fc-prev-button').removeClass('btn-primary').addClass('btn-outline-danger');
    $('.fc-next-button').removeClass('btn-primary').addClass('btn-outline-danger');
    $('.fc-today-button').removeClass('btn-primary').addClass('btn-outline-danger');
    $('.fc-right h2').addClass('display-4').css({ 'color': '#696f71', 'font-size': '30px' });

});