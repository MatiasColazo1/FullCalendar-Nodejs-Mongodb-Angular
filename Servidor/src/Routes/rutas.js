const express = require('express');
const eventCalendarRoutes = express.Router();

const { CreateEventCalendarController } = require('../Controllers/CreateEventCalendar');
const { GetAllEventCalendarController } = require('../Controllers/GetAllEventCalendar');
const { GetOneEventCalendarController } = require('../Controllers/GetOneEventCalendar');
const { DeleteEventCalendarController } = require('../Controllers/DeleteEventCalendar');
const { UpdateEventCalendarController } = require('../Controllers/UpdateEventCalendar');

const createEventCalendarController = new CreateEventCalendarController();
eventCalendarRoutes.post("/calendario", (req, res) => createEventCalendarController.handle(req, res));

const getAllEventCalendarController = new GetAllEventCalendarController();
eventCalendarRoutes.get('/calendario', (req, res) => getAllEventCalendarController.handle(req, res));

const getOneEventCalendarController = new GetOneEventCalendarController();
eventCalendarRoutes.get('/calendario/:id', (req, res) => getOneEventCalendarController.handle(req, res));

const deleteEventCalendarController = new DeleteEventCalendarController();
eventCalendarRoutes.delete('/calendario/:id', (req, res) => deleteEventCalendarController.handle(req, res));

const updateEventCalendarController = new UpdateEventCalendarController();
eventCalendarRoutes.put('/calendario', (req, res) => updateEventCalendarController.handle(req, res));

module.exports = eventCalendarRoutes;
