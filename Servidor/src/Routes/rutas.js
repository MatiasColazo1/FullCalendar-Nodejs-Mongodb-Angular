const express = require('express');
const eventCalendarRoutes = express.Router();

const { CreateEventCalendarController } = require('../Controllers/CreateEventCalendar');
const { GetAllEventCalendarController } = require('../Controllers/GetAllEventCalendar');
const { GetOneEventCalendarController } = require('../Controllers/GetOneEventCalendar');
const { DeleteEventCalendarController } = require('../Controllers/DeleteEventCalendar');

const createEventCalendarController = new CreateEventCalendarController();
eventCalendarRoutes.post("/calendario", (req, res) => createEventCalendarController.handle(req, res));

const getAllEventCalendar = new GetAllEventCalendarController();
eventCalendarRoutes.get('/calendario', (req, res) => getAllEventCalendar.handle(req, res));

const getOneEventCalendar = new GetOneEventCalendarController();
eventCalendarRoutes.get('/calendario/:id', (req, res) => getOneEventCalendar.handle(req, res));

const deleteEventCalendar = new DeleteEventCalendarController();
eventCalendarRoutes.delete('/calendario/:id', (req, res) => deleteEventCalendar.handle(req, res));


module.exports = eventCalendarRoutes;
