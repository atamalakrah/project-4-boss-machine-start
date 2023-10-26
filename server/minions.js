const minionsRouter = require('express').Router();

module.exports = minionsRouter;
const dbModule = require('./db');
const helperFunc = require('./helper');

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

minionsRouter.param('workId', (req, res, next, id) => {
    const work = dbModule.getFromDatabaseById('work', id);
    if(work){
        req.work = work;
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

minionsRouter.get('/:id/work', (req, res, next) => {
    const allWork = dbModule.getAllFromDatabase('work');
    let filteredWork = helperFunc.filterByValue(allWork, req.params.id);
    res.send(filteredWork);
});

minionsRouter.post('/:id/work', (req, res, next) => {
    const newWork = dbModule.addToDatabase('work', req.body);
    res.status(201).send(newWork);
});

minionsRouter.delete('/:minionId/work/:workId', (req, res, next) => {
    let workDelete = dbModule.deleteFromDatabasebyId('work', req.params.workId);
    res.status(204).send();
});

minionsRouter.put('/:minionId/work/:workId', (req, res, next) => {
    const allWork = dbModule.getAllFromDatabase('work');
    const foundWork = allWork.find(obj => obj.id === req.work.id);
    if(foundWork.minionId !== req.body.minionId){
        res.status(400).send();
    } else {
        let workUpdate = dbModule.updateInstanceInDatabase('work', req.body);
        res.send(workUpdate);
    }
});