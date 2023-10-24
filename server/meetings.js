const meetingsRouter = require('express').Router();

module.exports = meetingsRouter;
const dbModule = require('./db');

meetingsRouter.get('/', (req, res, next) => {
    res.send(dbModule.getAllFromDatabase('meetings'));
});

meetingsRouter.post('/', (req, res, next) => {
    let newMeeting = dbModule.addToDatabase('meetings', dbModule.createMeeting());
    res.status(201).send(newMeeting);
  });

meetingsRouter.delete('/', (req, res, next) => {
    dbModule.deleteAllFromDatabase('meetings');
    res.status(204).send();
});