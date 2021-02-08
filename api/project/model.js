// build your `Project` model here
const db = require('../../data/dbConfig');

async function getProjects() {
    const projects = await db("projects");
    return projects.map((project) => {
      return {
        ...project,
        project_completed: project.project_completed == 0 ? false : true,
      };
    });
}

async function getProjectById(id) {
    const [project] = await db("projects").where({ id });
    return {
      ...project,
      project_completed: project.project_completed == 0 ? false : true,
    };
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