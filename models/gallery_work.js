const arrayGalleryWorks = require('../data/gallery_work');

const getTodos = () => {
    return arrayGalleryWorks;
}

const getById = (id) => {
    return arrayGalleryWorks.find( work => work._id === id );
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