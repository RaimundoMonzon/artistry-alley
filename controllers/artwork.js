const artworkModel = require("../models/artwork");

const getTodos = (req, res) => {    
    res.json( artworkModel.getTodos() );
}

const getByID = (req, res) => {
    let {id} = req.params;
    const idEntero = parseInt(id);

    const work = artworkModel.getByID(idEntero);

    //res.send(`El id es ${id}`)
    if (work) {
        res.json(work);
    } else {
        res.status(404).json({
            id,
            encontrado: false
        });
    }
}

const deleteById = (req, res) => {
    let {id} = req.params;
    const idEntero = parseInt(id);

    const work = artworkModel.deleteById(idEntero);
    if (work) {
        res.json(work);
    } else {
        res.status(404).json({
            id,
            encontrado: false
        });
    }
}

const updateById = (req, res) => {
    let {id} = req.params;
    const idEntero = parseInt(id);

    const work = artworkModel.updateById(idEntero, req.body);
    if (work) {
        res.json(work);
    } else {
        res.status(404).json({
            id,
            encontrado: false
        });
    }
}

const add = (req, res) => {
    const work = artworkModel.add(req.body);

    if (work) {
        res.json(work);
    } else {
        res.status(404).json({
            id,            
            encontrado: false
        });
    }
}




module.exports = {
    getTodos,
    getByID,
    deleteById,
    updateById,
    add
}