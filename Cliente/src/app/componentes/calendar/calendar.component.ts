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
    this.openModal({ event: clickInfo.event }, true);
  }

  handleDateClick(arg: any): void {
    this.openModal({ date: arg.dateStr }, false);
  }

  toogleWeekends(): void {
    this.calendarOptions.weekends = !this.calendarOptions.weekends;
  }
}