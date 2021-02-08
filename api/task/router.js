// build your `/api/projects` router here
const express = require('express');
const Tasks = require('./model');
const router = express.Router();

router.get("/", (req, res, next) => {
    Tasks.getTasks()
        .then((tasks) => res.status(200).json(tasks))
        .catch((err) => {
            err.statusCode = 500;
            err.message = "Failed to get list of tasks";
            next(err);
        });
});

router.post("/", checkBody, async (req, res, next) => {
    const task = req.task;
    
    Tasks.addTask(task)
        .then((newId) => {
            const [id] = newId;
            Tasks.getTask(id)
                .then((newTask) => res.status(201).json(newTask))
                .catch((err) => {
                    err.statusCode = 500;
                    err.message = "Failed to add a new task.";
                    next(err);
                });
            })
        .catch((err) => {
            err.statusCode = 500;
            err.message = "Failed to add a new task.";
            next(err);
        });
});

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

module.exports = router;