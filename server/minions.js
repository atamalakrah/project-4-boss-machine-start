const minionsRouter = require('express').Router();

module.exports = minionsRouter;
const dbModule = require('./db');

minionsRouter.param('id', (req, res, next, id) => {
    const minion = dbModule.getFromDatabaseById('minions', id);
    if(minion){
        req.minion = minion;
        next();
    }
    else{
        res.status(404).send();
    }
});

minionsRouter.get('/', (req, res, next) => {
    res.send(dbModule.getAllFromDatabase('minions'));
});

minionsRouter.get('/:id', (req, res, next) => {
    res.send(req.minion);
});

minionsRouter.post('/', (req, res, next) => {
    const newMinion = dbModule.addToDatabase('minions', req.body);
    res.status(201).send(newMinion);
});

minionsRouter.put('/:id', (req, res, next) => {
    let minionUpdate = dbModule.updateInstanceInDatabase('minions', req.body);
    res.status(201).send(minionUpdate);
});

minionsRouter.delete('/:id', (req, res, next) => {
    let minionDelete = dbModule.deleteFromDatabasebyId('minions', req.params.id);
    res.status(204).send();
});