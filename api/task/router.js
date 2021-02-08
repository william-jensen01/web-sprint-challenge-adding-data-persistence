// build your `/api/projects` router here
const express = require('express');
const Tasks = require('./model');
const router = express.Router();

router.get('/', async (req, res, next) => {
    try {
        const tasks = await Tasks.getTasks();
        res.status(200).json(tasks)
    } catch (err) {
        err.message = "Failed to get list of tasks"
        next(err)
    }
});

router.get('/:id', checkId, async (req, res, next) => {
    try {
        res.json(req.task)
    } catch (err) {
        next(err)
    }
})

router.post('/', checkBody, async (req, res, next) => {
    try {
        const newTask = await Tasks.addTask(req.task)
        res.status(201).json(newTask)
    } catch (err) {
        err.message = "Failed to add new task"
        next(err)
    }
})

function checkBody (req, res, next) {
    const body = req.body;
    if (!body || !body.task_description || !body.project_id) {
        const err = new Error("body must include 'task_description' and 'project_id'");
        err.statusCode = 400;
        next(err)
    } else {
        req.task = body;
        next();
    }
}

function checkId (req, res, next) {
    const { id } = req.params;
    try {
        const task = Tasks.getTaskById(id);
        if (task) {
            req.task = task;
            next()
        } else {
            const err = new Error('Invalid id');
            err.statusCode = 404;
            next(err)
        }
    } catch (err) {
        err.statusCode = 500;
        err.message = 'Failed to get task';
        next(err);
    }
}

module.exports = router;