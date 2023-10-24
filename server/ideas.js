const ideasRouter = require('express').Router();

module.exports = ideasRouter;
const dbModule = require('./db');

ideasRouter.get('/:ideaId', (req, res, next) => {
    const idIndex = req.params.id;
    const checkDB = dbModule.getFromDatabaseById('ideas', idIndex);
    if(checkDB === null){
        res.status(404).send();
    }
    else{
        res.send(checkDB);
    }
});

ideasRouter.get('/', (req, res, next) => {
    res.send(dbModule.getAllFromDatabase('ideas'));
});

ideasRouter.post('/', (req, res, next) => {
    const newIdea = dbModule.addToDatabase('ideas', req.body);
    res.status(201).send(newIdea);
});

ideasRouter.put('/:ideaId', (req, res, next) => {
    const ideaUpdate = dbModule.updateInstanceInDatabase('ideas', req.params);
    if(ideaUpdate === null){
        res.status(404).send();
    }
    else{
        res.status(201).send(ideaUpdate);
    }
});

ideasRouter.delete('/:ideaId', (req, res, next) => {
    const ideaDelete = dbModule.getFromDatabaseById('ideas', req.params.ideaId);
    if(ideaDelete){
        res.status(204).send();
    }
    else{
        res.status(404).send();
    }
});