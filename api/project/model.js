// build your `Project` model here
const db = require('../../data/dbConfig');

async function getProjects() {
    return db("projects");
}

async function getProjectById(id) {
    const [project] = await db("projects").where({ id });
    return project;
}

async function addProject(data) {
    const [newProjectId] = await db("projects").insert(data);
    const newProject = await getProjectById(newProjectId);
    return newProject;
}

module.exports = {
    getProjects,
    getProjectById,
    addProject
}