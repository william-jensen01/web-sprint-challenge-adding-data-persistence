// build your `Task` model here
const db = require('../../data/dbConfig');

async function getTasks() {
    return await db("tasks");
}

async function getTaskById(id) {
    const [task] = await db("tasks").where({ id })
    return task;
}

async function addTask(data) {
    const [taskId] = await db("tasks").insert(data);
    const newTask = await getTaskById(taskId);
    return newTask;
}

module.exports = {
    getTasks,
    getTaskById,
    addTask
}