// build your `/api/projects` router here
const express = require('express');
const Resources = require('./model');
const router = express.Router();

router.get('/', async (req, res, next) => {
    try {
        const resources = await Resources.getResources();
        res.status(200).json(resources)
    } catch (err) {
        err.message = "Failed to get list of resources"
        next(err)
    }
});

router.get('/:id', checkId, async (req, res, next) => {
    try {
        res.json(req.resource)
    } catch (err) {
        next(err)
    }
})

router.post('/', checkBody, async (req, res, next) => {
    try {
        const newResource = await Resources.addResource(req.resource)
        res.status(201).json(newResource)
    } catch (err) {
        err.message = "Failed to add new resource"
        next(err)
    }
})

function checkBody (req, res, next) {
    const body = req.body;
    if (!body || !body.resource_name) {
        const err = new Error("body must include 'resource_name'");
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
        const resource = Resources.getResourceById(id);
        if (resource) {
            req.resource = resource;
            next()
        } else {
            const err = new Error('Invalid id');
            err.statusCode = 404;
            next(err)
        }
    } catch (err) {
        err.statusCode = 500;
        err.message = 'Failed to get resource';
        next(err);
    }
}

module.exports = router;