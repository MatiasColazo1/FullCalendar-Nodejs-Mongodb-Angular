const mongoose = require('mongoose');
mongoose.set('strictQuery', false);

mongoose.connect('mongodb://localhost/fullcalendar', {

})
    .then(db => console.log('Database conectada'))
    .catch(err => console.log(err));