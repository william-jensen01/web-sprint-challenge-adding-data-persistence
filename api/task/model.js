// build your `Task` model here
const db = require('../../data/dbConfig');

async function getTasks() {
    const tasks = await db("tasks").join("projects", "tasks.project_id", "=", "projects.project_id");
  
    return tasks.map((task) => {
      return {
        ...task,
        task_completed: task.task_completed === 0 ? false : true,
      };
    });
  }

async function getTaskById(id) {
    const [task] = await db("tasks").where({ task_id: id });
    return {
      ...task,
      task_completed: task.task_completed === 0 ? false : true,
    };
}

function addTask(data) {
    return db("tasks").insert(data);
}

module.exports = {
    getTasks,
    getTaskById,
    addTask
}