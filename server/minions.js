const minionsRouter = require('express').Router();

module.exports = minionsRouter;
const dbModule = require('./db');

minionsRouter.get('/', (req, res, next) => {
    res.send(dbModule.getAllFromDatabase('minions'));
});

minionsRouter.get('/:minionId', (req, res, next) => {
    const idIndex = req.params;
    const checkDB = dbModule.getFromDatabaseById('minions', idIndex.minionId);
    if(checkDB === null){
        res.status(404).send();
    }
    else{
        res.send(checkDB);
    }
});

minionsRouter.post('/', (req, res, next) => {
    const newMinion = dbModule.addToDatabase('minions', req.body);
    res.status(201).send(newMinion);
});

minionsRouter.put('/:minionId', (req, res, next) => {
    const minionUpdate = dbModule.updateInstanceInDatabase('minions', req.params);
    if(minionUpdate === null){
        res.status(404).send();
    }
    else{
        res.status(201).send(minionUpdate);
    }
});

minionsRouter.delete('/:minionId', (req, res, next) => {
    const minionDelete = dbModule.deleteFromDatabasebyId('minions', req.params.minionId);
    if(minionDelete){
        res.status(204).send();
    }
    else{
        res.status(404).send();
    }
});