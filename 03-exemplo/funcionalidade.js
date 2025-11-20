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
        eventDidMount: function (info) {
            // Alterar cor do título do evento
            const elementoDoTitulo = info.el.querySelector('.fc-event-title');
            if (elementoDoTitulo) {
                elementoDoTitulo.style.color = '#fff'; // cor branca (ajuste conforme desejar)
                elementoDoTitulo.style.fontWeight = 'bold';
            }
            
            // Renderizar descrição com cor personalizada
            if (info.event.extendedProps.description) {
                const elementoDaDescricao = document.createElement('div');
                elementoDaDescricao.style.color = '#aaa'; // cor da descrição
                elementoDaDescricao.style.fontSize = '0.85rem';
                elementoDaDescricao.style.marginTop = '0.3rem';
                elementoDaDescricao.style.fontStyle = 'italic';
                elementoDaDescricao.textContent = info.event.extendedProps.description;
                info.el.appendChild(elementoDaDescricao);
            }
        },
        dateClick: function (info) {
            let title = prompt('Informe o título para o evento', 'Novo evento ...')
            if (title) {
                calendario.addEvent({ title, start: info.date, allDay: true })
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
    
    // Capturar dados do formulário e inserir o novo evento no calendário:
    const formulario = document.querySelector('form');
    const botaoAdicionar = formulario.querySelector('button');
    
    botaoAdicionar.addEventListener('click', function (e) {
        e.preventDefault(); // Impedir envio padrão do formulário.
        
        // Capturar valores informados pelo usuário nos campos:
        const titulo = document.getElementById('titulo').value;
        const descricao = document.getElementById('descricao').value;
        const inicio = document.getElementById('inicio').value;
        const fim = document.getElementById('fim').value;
        const cor = document.getElementById('cor').value;
        const diaTodo = document.getElementById('duracao').checked;
        
        // Validar se o título foi preenchido
        if (!titulo.trim()) {
            alert('Por favor, informe o título do evento');
            return;
        }
        
        // Validar se a data de início foi preenchida
        if (!inicio) {
            alert('Por favor, informe a data de início do evento');
            return;
        }
        
        // Criar objeto do evento
        const novoEvento = {
            title: titulo,
            start: inicio,
            end: fim || inicio, // Se não houver fim, usar o início.
            color: cor || '#3788d8', // Cor padrão azul se não informar.
            allDay: diaTodo,
            extendedProps: {
                description: descricao
            }
        };
        
        // Adicionar evento ao calendário
        calendario.addEvent(novoEvento);
        
        // Limpar formulário
        formulario.reset();
        
        alert('Evento adicionado com sucesso!');
    });
});