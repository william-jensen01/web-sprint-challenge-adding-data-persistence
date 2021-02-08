// build your `/api/projects` router here
const express = require('express');
const Resources = require('./model');
const router = express.Router();

router.get("/", (req, res, next) => {
  Resources.getResources()
    .then((resources) => res.status(200).json(resources))
    .catch((err) => {
      err.statusCode = 500;
      err.message = "Failed to get list of resources";
      next(err);
    });
  });

  router.post("/", checkBody, (req, res, next) => {
    const resource = req.resource;
    Resources.addResource(resource)
      .then(async (newId) => {
        try {
          const [id] = newId;
          const newResource = await Resources.getResourceById(id);
          res.status(201).json(newResource);
        } catch (err) {
          err.statusCode = 500;
          err.message = "Failed to add a new resource.";
          next(err);
        }
      })
      .catch((err) => {
        err.statusCode = 500;
        err.message = "Failed to add a new resource.";
        next(err);
      });
  });

function checkBody (req, res, next) {
    const body = req.body;
    if (!body || !body.resource_name) {
        const err = new Error("body must include 'resource_name'");
        err.statusCode = 400;
        next(err)
    } else {
        req.resource = body;
        next();
    }
}

module.exports = router;