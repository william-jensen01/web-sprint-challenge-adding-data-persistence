// build your `/api/projects` router here
const express = require('express');
const Projects = require('./model');
const router = express.Router();

router.get("/", (req, res, next) => {
  Projects.getProjects()
    .then((projects) => res.status(200).json(projects))
    .catch((err) => {
      err.statusCode = 500;
      err.message = "Failed to get list of projects";
      next(err);
    });
});

router.post("/", checkBody, (req, res, next) => {
  const project = req.project;
  Projects.addProject(project)
    .then(async (newId) => {
      try {
        const [id] = newId;
        const newProject = await Projects.getProject(id);
        res.status(201).json(newProject);
      } catch (err) {
        err.statusCode = 500;
        err.message = "Failed to add a new project.";
        next(err);
      }
    })
    .catch((err) => {
      err.statusCode = 500;
      err.message = "Failed to add a new project.";
      next(err);
    });
});

function checkBody (req, res, next) {
  const body = req.body;
  if (!body || !body.project_name) {
      const err = new Error("body must include 'project_name' and 'project_description'");
      err.statusCode = 400;
      next(err)
  } else {
      req.project = body;
      next();
  }
}

module.exports = router;