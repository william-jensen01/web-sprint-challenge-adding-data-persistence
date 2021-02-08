// build your `Resource` model here
const db = require('../../data/dbConfig');

function getResources() {
    return db("resources");
}

async function getResourceById(id) {
    const [resource] = await db("resources").where({ id })
    return resource;
}

function addResource(data) {
    return db("resources").insert(data);
}

module.exports = {
    getResources,
    getResourceById,
    addResource
}