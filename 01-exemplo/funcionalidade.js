// Definição dos eventos no formato JSON:
const eventos = [
    {
        "title": "Reunião de Planejamento",
        "start": "2025-11-18T10:00:00",
        "end": "2025-11-20T12:00:00",
        "description": "Reunião para planejar as atividades do projeto",
        "color": "blue"
    },
    {
        "title": "Entrega do Relatório",
        "start": "2025-11-21T09:00:00",
        "description": "Entrega do relatório final do projeto",
        "color": "red"
    },
    {
        "title": "Evento de Networking",
        "start": "2025-11-22T14:00:00",
        "end": "2025-11-22T18:00:00",
        "description": "Oportunidade de fazer contatos com profissionais da área",
        "color": "orange"
    }
];

document.addEventListener('DOMContentLoaded', function () {
    const elementoDoCalendario = document.getElementById('meu-calendario');
    const calendario = new FullCalendar.Calendar(elementoDoCalendario, {
        locale: 'pt-br',
        events: eventos,  // Passa os eventos para o calendário
        headerToolbar: {
            left: 'prev,next today',
            center: 'title',
            right: 'timeGridWeek,timeGridDay'
        },
        initialView: 'timeGridWeek',
        dateClick: function (info) {
            let title = prompt('Informe o título para o evento', 'Novo evento ...')
            if (title) {
                calendario.addEvent({ title, start: info.date, allDay: false, color: 'green' })
                alert('Evento adicionado com sucesso!');
            }
        },
        eventClick: function (info) {
            alert("Data: " + info.event.startStr +
                "\nEvento: " + info.event.title +
                "\nDescrição: " + info.event.extendedProps.description);
        }
    });

    calendario.render();
});