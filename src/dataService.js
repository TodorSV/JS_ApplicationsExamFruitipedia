import { api } from "./api.js";


const dataEndPoints = {
    getAll: "data/fruits?sortBy=_createdOn%20desc",
    postSingleFruit: "data/fruits",
    singleFruit: "data/fruits/",
}   

async function getAllFruits() {
    return api.get(dataEndPoints.getAll);
}

async function getSingleFruit(id) {
    return api.get(dataEndPoints.singleFruit + id);
}


async function createFruit(data) {
    return api.post(dataEndPoints.postSingleFruit, data);
}

async function updateFruit(id, data) {
    return api.put(dataEndPoints.singleFruit + id, data);
}

async function deleteFruit(id) {
    return api.del(dataEndPoints.singleFruit + id);
}

async function search(searchText) {
    return api.get(`data/fruits?where=name%20LIKE%20%22${searchText}%22`);
}

export const dataService = {
    getAllFruits,
    getSingleFruit,
    createFruit,
    updateFruit,
    deleteFruit,
    search
}