import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CalendarioService } from 'src/app/services/calendario.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})

export class ModalComponent {
  @Input() open: boolean | undefined;
  @Input() eventInfos: any; // Define el tipo adecuado
  @Input() isEditCard: boolean | undefined;
  @Output() handleClose = new EventEmitter<void>();

  title: string = '';
  cardColor: any = { backgroundColor: '#039be5', textColor: '#ffffff' }; // Define el tipo adecuado

  listColorsCard: ColorsCard[] = [
    { backgroundColor: '#039be5', textColor: '#ffffff' },
    // Agrega más colores según tus necesidades
  ];

  constructor(private calendarioService: CalendarioService) { }
  
  async handleAddedEvent() {
    try {
      const eventCalendar = await this.calendarioService.createEventCalendar({
        title: this.title || 'Sin título',
        start: this.eventInfos.startStr,
        end: this.eventInfos.endStr,
        backgroundColor: this.cardColor.backgroundColor,
        textColor: this.cardColor.textColor,
      });
  
      // Aquí podrías actualizar el calendario con el nuevo evento
      // Esto depende de cómo estés manejando el calendario en Angular
  
      this.handleClose.emit(); // Cierra el modal
    } catch (error) {
      console.error('Error al crear un evento', error);
      // Manejo de errores, por ejemplo, mostrar un mensaje al usuario
    }
  }



  async handleDeleteEvent() {
    try {
      await this.calendarioService.deleteEventCalendar(this.eventInfos.event.id);
  
      // Actualiza el calendario para reflejar la eliminación del evento
  
      this.handleClose.emit(); // Cierra el modal
    } catch (error) {
      console.error('Error al eliminar un evento', error);
      // Manejo de errores
    }
  }

  async handleUpdatedEvent() {
    try {
      const updatedEvent = {
        id: this.eventInfos.event.id,
        title: this.title || 'Sin título',
        start: this.eventInfos.event.startStr,
        end: this.eventInfos.event.endStr,
        backgroundColor: this.cardColor.backgroundColor,
        textColor: this.cardColor.textColor,
      };
  
      await this.calendarioService.updateEventCalendar(updatedEvent);
  
      // Actualiza el evento en el calendario
  
      this.handleClose.emit(); // Cierra el modal
    } catch (error) {
      console.error('Error al actualizar un evento', error);
      // Manejo de errores
    }
  }
}

interface ColorsCard {
  backgroundColor: string;
  textColor: string;
}