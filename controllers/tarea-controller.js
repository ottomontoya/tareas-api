const Tarea = require("../models/tarea")

function createTarea(req, res){
    console.log("Creando tarea...");
    console.log(req.body);

    let tarea = new Tarea({
       id: req.body.id,
       nombre: req.body.nombre,
       puntos: req.body.puntos,
       materia: req.body.materia,
       fechaEntrega: req.body.fechaEntrega
    });

    tarea.save((error, result) =>{
       if (error){
           return res.status(500).json({
               error: true,
               message: "Server down.",
               code: 0
           });
       }
       if (!result){
           return res.status(400).json({
               error: true,
               message: "Client error.",
               code: 10
           });
       }
       return res.status(200).json({
           error: false,
           message: "OK",
           code: 20,
           data: result
       });
    });
}

function updateTarea(req, res){
    const tareaId = req.params.id; // id de lo que se actualizará
    const newTarea = req.body;

    console.log("Updating tarea...");
    console.log(req.body);

    Tarea.findByIdAndUpdate(tareaId, newTarea, {new: true},(error, result) =>{
        if (error){
            return res.status(500).json({
                error: true,
                message: "Server down.",
                code: 0
            });
        }
        if (!result){
            return res.status(400).json({
                error: true,
                message: "Client error.",
                code: 10
            });
        }
        return res.status(200).json({
            error: false,
            message: "OK",
            code: 20,
            data: result
        });
    });
}

function findAllTareas(req, res){
    console.log("Finding tareas...");
    console.log(req.body);

    Tarea.find({}, (error, result) => {
        if (error){
            return res.status(500).json({
                error: true,
                message: "Server down.",
                code: 0
            });
        }
        if (!result){
            return res.status(400).json({
                error: true,
                message: "Client error.",
                code: 10
            });
        }
        return res.status(200).json({
            error: false,
            message: "OK",
            code: 20,
            data: result
        });
    })
}

function deleteTarea(req, res){
   const tarea_id = req.params.id;

    Tarea.findOneAndDelete({id: tarea_id}, (error, result) => {
        if (error){
            return res.status(500).json({
                error: true,
                message: "Server down.",
                code: 0
            });
        }
        if (!result){
            return res.status(400).json({
                error: true,
                message: "Client error.",
                code: 10
            });
        }
        return res.status(200).json({
            error: false,
            message: "OK",
            code: 20,
            data: result
        });
    })
}

module.exports = {
    createTarea,
    updateTarea,
    findAllTareas,
    deleteTarea
}