// Importaciones necesarias
const  EventCalendarRepository  = require("../Repository/EventCalendarRepository");
const { CustomError } = require("../Error/CustomError");

// Clase para el servicio
class GetAllEventCalendarService {
    constructor(eventCalendarRepository) {
        this.eventCalendarRepository = eventCalendarRepository;
    }

    async execute() {
        try {
            const eventsCalendar = await this.eventCalendarRepository.getAll();

            if (!eventsCalendar) {
                return [];
            }

            return eventsCalendar;
        } catch (err) {
            throw err;
        }
    }
}

// Clase para el controlador
class GetAllEventCalendarController {
    async handle(request, response) {
        try {
            const eventCalendarRepository = new EventCalendarRepository();
            const getAllEventCalendarService = new GetAllEventCalendarService(eventCalendarRepository);
            const eventsCalendar = await getAllEventCalendarService.execute();

            return response.status(200).json(eventsCalendar);
        } catch (err) {
            if (err instanceof CustomError) {
                response.status(err.status).json({ message: err.message });
            } else {
                // Manejo de otros tipos de errores
                console.error(err);
                response.status(500).json({ message: "An unexpected error occurred" });
            }
        }
    }
}

// Exportación de las clases
module.exports = {
    GetAllEventCalendarService,
    GetAllEventCalendarController
};