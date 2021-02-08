// build your `Resource` model here
const db = require('../../data/dbConfig');

async function getResources() {
    return await db("resources");
}

async function getResourceById(id) {
    const [resource] = await db("resources").where({ id })
    return resource;
}

async function addResource(data) {
    const [resourceId] = await db("resources").insert(data);
    const newResource = await getResourceById(resourceId);
    return newResource;
}

module.exports = {
    getResources,
    getResourceById,
    addResource
}