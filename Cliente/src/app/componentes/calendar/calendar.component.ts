import { Component, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import { CalendarioService } from 'src/app/services/calendario.service';
import { EventClickArg } from '@fullcalendar/core';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
  modalOpen: boolean = false;
selectedEvent: any; 
  eventInfos: any; // Tipo según sea necesario
  isEditCard: boolean = false;

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    weekends: false,
    selectable: true,
    selectMirror: true,
    eventClick: this.handleDateClick.bind(this),
    plugins: [timeGridPlugin, dayGridPlugin, interactionPlugin],
 
  };


  constructor(private calendarioService: CalendarioService) { }
  

  ngOnInit(): void {
    this.calendarioService.getAllEventsCalendar().subscribe(data => {
      // Asumiendo que 'data' es un array de eventos en el formato que FullCalendar espera
      this.calendarOptions = { 
        ...this.calendarOptions,
        events: data
      };
    });
  }

  openModal() {
    this.modalOpen = true;
  }
  
  closeModal() {
    this.modalOpen = false;
  }


  
 

  handleEventClick(clickInfo: EventClickArg) {
    // Aquí puedes agregar tu lógica para manejar el evento de clic
    this.eventInfos = clickInfo.event;
    this.isEditCard = true; // Ajusta según sea necesario
    this.openModal();
  }
  

  handleDateClick(arg: any) {
    // Aquí puedes agregar tu lógica para manejar la selección de fecha
    this.eventInfos = { date: arg.dateStr }; // Ajusta según sea necesario
    this.isEditCard = false;
    this.openModal();
  }


  


  //boton de alternal findes
  toogleWeekends() {
    this.calendarOptions.weekends = !this.calendarOptions.weekends
  }
}

