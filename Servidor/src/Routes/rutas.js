const express = require('express');
const eventCalendarRoutes = express.Router();

// Importa el controlador (el servicio se usa dentro del controlador)
const { CreateEventCalendarController } = require('../Controllers/CreateEventCalendar');

// Crea una instancia del controlador
const createEventCalendarController = new CreateEventCalendarController();

// Configura la ruta para manejar las solicitudes POST en "/calendario"
eventCalendarRoutes.post("/calendario", (req, res) => createEventCalendarController.handle(req, res));

module.exports = eventCalendarRoutes;
