const gallery_workModel = require("../models/gallery_work");

const getTodos = (req, res) => {    
    res.json( gallery_workModel.getTodos() );
}

const getByID = (req, res) => {
    let {id} = req.params;
    const idEntero = parseInt(id);

    const work = gallery_workModel.getByID(idEntero);

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

    const work = gallery_workModel.deleteById(idEntero);
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

    const work = gallery_workModel.updateById(idEntero, req.body);
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
    const work = gallery_workModel.add(req.body);

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