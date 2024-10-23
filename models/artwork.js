const arrayArtworks = require('../data/artwork');

const getTodos = () => {
    return arrayArtworks;
}

const getById = (id) => {
    return arrayArtworks.find( work => work._id === id );
}

const deleteById = (id) => {
    // TODO...
}
const updateById = (id) => {
    // TODO...
}
const add = (work) => {
    // TODO...
}

module.exports = {
    getTodos,
    getById,
    deleteById,
    updateById,
    add
}