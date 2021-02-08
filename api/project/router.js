// build your `/api/projects` router here
const express = require('express');
const Projects = require('./model');
const router = express.Router();

router.get('/', async (req, res, next) => {
    try {
        const projects = await Projects.getProjects();
        res.status(200).json(projects)
    } catch (err) {
        err.message = "Failed to get list of projects"
        next(err)
    }
});

router.get('/:id', checkId, async (req, res, next) => {
    try {
        res.json(req.project)
    } catch (err) {
        next(err)
    }
})

router.post('/', checkBody, async (req, res, next) => {
    try {
        const newProject = await Projects.addProject(req.project)
        res.status(201).json(newProject)
    } catch (err) {
        err.message = "Failed to add new project"
        next(err)
    }
})

function checkBody (req, res, next) {
    const body = req.body;
    if (!body || !body.project_name) {
        const err = new Error("body must include 'project_name'");
        err.statusCode = 400;
        next(err)
    } else {
        req.project = body;
        next();
    }
}

function checkId (req, res, next) {
    const { id } = req.params;
    try {
        const project = Projects.getProjectById(id);
        if (project) {
            req.project = project;
            next()
        } else {
            const err = new Error('Invalid id');
            err.statusCode = 404;
            next(err)
        }
    } catch (err) {
        err.statusCode = 500;
        err.message = 'Failed to get project';
        next(err);
    }
}

module.exports = router;