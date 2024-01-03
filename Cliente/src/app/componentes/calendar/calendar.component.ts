import { Component, OnInit } from '@angular/core';
import { CalendarOptions, EventClickArg } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from '../modal/modal.component';
import { CalendarioService } from 'src/app/services/calendario.service';

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
    dateClick: this.handleDateClick.bind(this),
    eventClick: this.handleEventClick.bind(this),
    plugins: [timeGridPlugin, dayGridPlugin, interactionPlugin],
  };

  constructor(private calendarioService: CalendarioService, public dialog: MatDialog) {}

  ngOnInit(): void {
    
    this.calendarioService.getAllEventsCalendar().subscribe(data => {
      this.calendarOptions = { ...this.calendarOptions, events: data };
    });
    
  }

  openModal(eventInfos: any, isEdit: boolean): void {
    this.dialog.open(ModalComponent, {
      width: '250px',
      data: { eventInfos, isEdit }
    });
  }

  handleEventClick(clickInfo: EventClickArg): void {
    let eventInfo = {
      event: clickInfo.event,
      start: clickInfo.event.start, // Fecha de inicio
      end: clickInfo.event.end // Fecha de finalización
    };
  
    this.openModal(eventInfo, true);
  }

  handleDateClick(arg: any): void {
    const startDate = new Date(arg.dateStr);
    const endDate = new Date(startDate);
    endDate.setHours(startDate.getHours() + 1);
   
    this.openAddEventModal(startDate, endDate);
  }

  
  openAddEventModal(startDate: Date, endDate: Date): void {
    const eventInfos = {
      startStr: startDate.toISOString(),
      endStr: endDate.toISOString()
    };
  
    const dialogRef = this.dialog.open(ModalComponent, {
      width: '250px',
      data: { eventInfos, isEdit: false }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      console.log('Modal cerrado', result);
    });
  }

  toogleWeekends(): void {
    this.calendarOptions.weekends = !this.calendarOptions.weekends;
  }
}