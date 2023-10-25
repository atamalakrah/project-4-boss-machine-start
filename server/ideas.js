const ideasRouter = require('express').Router();

module.exports = ideasRouter;
const dbModule = require('./db');
const checkMillionDollarIdea = require('./checkMillionDollarIdea');

ideasRouter.param('id', (req, res, next, id) => {
    const idea = dbModule.getFromDatabaseById('ideas', id);
    if(idea){
        req.idea = idea;
        next();
    }
    else{
        res.status(404).send();
    }

});

ideasRouter.get('/:id', (req, res, next) => {
    res.send(req.idea);
});

ideasRouter.get('/', (req, res, next) => {
    res.send(dbModule.getAllFromDatabase('ideas'));
});

ideasRouter.post('/', checkMillionDollarIdea,(req, res, next) => {
    const newIdea = dbModule.addToDatabase('ideas', req.body);
    res.status(201).send(newIdea);
});

ideasRouter.put('/:id', checkMillionDollarIdea, (req, res, next) => {
    let ideaUpdate = dbModule.updateInstanceInDatabase('ideas', req.body);
    res.send(ideaUpdate);
});

ideasRouter.delete('/:id', (req, res, next) => {
    let ideaDelete = dbModule.deleteFromDatabasebyId('ideas', req.params.id);
    res.status(204).send();
});