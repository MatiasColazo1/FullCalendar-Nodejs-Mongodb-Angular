import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CalendarioService } from 'src/app/services/calendario.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {
  title: string = '';
  cardColor: { backgroundColor: string, textColor: string } = { backgroundColor: '#039be5', textColor: '#ffffff' };


  listColorsCard: ColorsCard[] = [
    { backgroundColor: '#039be5', textColor: '#ffffff' },
    // Agrega más colores según tus necesidades
  ];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<ModalComponent>,
    private calendarioService: CalendarioService
  ) {}


  ngOnInit(): void {
    if (this.data.isEdit) {
      this.title = this.data.eventInfos?.event?.title;
      this.cardColor = {
        backgroundColor: this.data.eventInfos?.event?.backgroundColor,
        textColor: this.data.eventInfos?.event?.textColor,
      };
    }
  }
  

  handleAddedEvent(): void {
    if (!this.data.isEdit) {
      // Crear nuevo evento
      this.calendarioService.createEventCalendar({
        title: this.title || 'Sin título',
        start: this.data.eventInfos.startStr,
        end: this.data.eventInfos.endStr,
        backgroundColor: this.cardColor.backgroundColor,
        textColor: this.cardColor.textColor,
      }).subscribe({
        next: (response) => {
          // Maneja la respuesta
          this.closeDialog();
        },
        error: (error) => {
          // Maneja el error
        }
      });
    } else {
      // Actualizar evento existente
      this.calendarioService.updateEventCalendar({
        _id: this.data.eventInfos.event.id,
        title: this.title || 'Sin título',
        start: this.data.eventInfos.event.startStr,
        end: this.data.eventInfos.event.endStr,
        backgroundColor: this.cardColor.backgroundColor,
        textColor: this.cardColor.textColor,
      }).subscribe({
        next: (response) => {
          // Maneja la respuesta
          this.closeDialog();
        },
        error: (error) => {
          // Maneja el error
        }
      });
    }
  }

  handleDeleteEvent(): void {
    this.calendarioService.deleteEventCalendar(this.data.eventInfos.event.id).subscribe({
      next: (response) => {
        // Maneja la respuesta
        this.closeDialog();
      },
      error: (error) => {
        // Maneja el error
      }
    });
  }

  handleSelectCardColor(color: ColorsCard): void {
    this.cardColor = {
      backgroundColor: color.backgroundColor,
      textColor: color.textColor,
    };
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}

interface ColorsCard {
  backgroundColor: string;
  textColor: string;
}