import { Component, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import { CalendarioService } from 'src/app/services/calendario.service';
import { EventClickArg } from '@fullcalendar/core';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    weekends: false,
    selectable: true,
    selectMirror: true,
    eventClick: this.handleDateClick.bind(this),
    select: this.handleDateSelect.bind(this),
    plugins: [dayGridPlugin],
    events: []
  };

  constructor(private calendarioService: CalendarioService) { }
  

  ngOnInit(): void {
    this.loadEvents();
  }

  loadEvents(): void {
    this.calendarioService.getEvents('2023-01-01', '2023-12-31').subscribe(events => {
      this.calendarOptions = {
        initialView: 'dayGridMonth',
        weekends: false,
        eventClick: this.handleDateClick.bind(this),
        plugins: [dayGridPlugin],
        events: events
      };
    });
  }


  
  handleDateSelect(selectInfo: any) {
    const title = prompt('Por favor ingresa un nuevo título para tu evento');
    const calendarApi = selectInfo.view.calendar;

    calendarApi.unselect(); // clear date selection

    if (title) {
      const newEvent = {
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
      };

      this.calendarioService.addEvent(newEvent).subscribe({
        next: (event) => {
          console.log('Evento agregado', event);
          // Aquí puedes optar por actualizar tu calendario en el frontend
          calendarApi.addEvent(event);
        },
        error: (error) => console.error('Error al agregar evento', error)
      });
    }
  }

  handleEventClick(clickInfo: EventClickArg) {
    if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
      clickInfo.event.remove();
    }
  }

  handleDateClick(arg: any) {
    alert('date click! ' + arg.dateStr)
  }


  


  //boton de alternal findes
  toogleWeekends() {
    this.calendarOptions.weekends = !this.calendarOptions.weekends
  }
}

