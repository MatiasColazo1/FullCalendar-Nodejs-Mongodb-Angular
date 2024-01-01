const express = require('express');
const eventCalendarRoutes = express.Router();

const { CreateEventCalendarController } = require('../Controllers/CreateEventCalendar');
const { DeleteEventCalendarController } = require('../Controllers/DeleteEventCalendar');
const { GetAllEventCalendarController } = require('../Controllers/GetAllEventCalendar');

const createEventCalendarController = new CreateEventCalendarController();
eventCalendarRoutes.post("/calendario", (req, res) => createEventCalendarController.handle(req, res));


const deleteEventCalendar = new DeleteEventCalendarController();
eventCalendarRoutes.delete('/calendario/:id', (req, res) => deleteEventCalendar.handle(req, res));

const getAllEventCalendar = new GetAllEventCalendarController();
eventCalendarRoutes.get('/calendario', (req, res) => getAllEventCalendar.handle(req, res));

module.exports = eventCalendarRoutes;
