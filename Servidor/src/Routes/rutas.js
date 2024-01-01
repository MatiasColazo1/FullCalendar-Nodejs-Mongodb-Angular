const express = require('express');
const eventCalendarRoutes = express.Router();

const { CreateEventCalendarController } = require('../Controllers/CreateEventCalendar');
const { DeleteEventCalendarController } = require('../Controllers/DeleteEventCalendar');

const createEventCalendarController = new CreateEventCalendarController();
eventCalendarRoutes.post("/calendario", (req, res) => createEventCalendarController.handle(req, res));


const deleteEventCalendar = new DeleteEventCalendarController();
eventCalendarRoutes.delete('/calendario/:id', (req, res) => deleteEventCalendar.handle(req, res));

module.exports = eventCalendarRoutes;
