let express = require('express');
let router = express.Router();
let validateSession = require('../middleware/validate-session');
const Log = require('../db').import('../models/log');

router.get('/practice', validateSession, function(req,res){
    res.send('Hey this is a practice router')
});

//CREATE LOG ENTRY//
router.post('/create', validateSession, (req,res)=> {
    const logEntry = {
        description: req.body.log.description,
        definition: req.body.log.definition,
        result: req.body.log.result,
        owner_id: req.user.id,
    }
    Log.create(logEntry)
    .then(log => res.status(200).json(log))
    .catch(err=> res.status(500).json({error:err}))
});

//GET ALL ENTRIES//
router.get("/", (req, res) => {
    Log.findAll()
    .then(log => res.status(200).json(log))
    .catch(err => res.status(500).json({error:err}))
});

//GET ENTRIES BY USER//
router.get("/mine", validateSession, (req, res) =>{
    let userid = req.user.id
    Log.findAll({
        where: {owner_id: userid}
    })
    .then(log => res.status(200).json(log))
    .catch(err => res.status(500).json({error:err}))
});

//GET ENTRIES BY TITLE//
router.get('/:description', function (req, res){
    let description = req.params.description;

    Log.findAll({
        where: {description: description}
    })
    .then(log => res.status(200).json(log))
    .catch(err => res.status(500).json({error:err}))
});


//UPDATE ENTRY//
router.put("/update/:resultId", validateSession, function (req, res){
   console.log(req.body);
    const updateLogEntry ={
        description: req.body.log.description,
        definition: req.body.log.definition,
        result: req.body.log.result,
    }; 
    
    const query = {where:{id: req.params.resultId, owner_id: req.user.id}};

    Log.update(updateLogEntry, query)
    .then((log)=> res.status(200).json(log))
    .catch((err)=> res.status(500).json({error:err}));
})

//DELETE ENTRY//
router.delete("/delete/:id", validateSession, function (req,res){
    const query = {where: {id: req.params.id, owner_id: req.user.id}};

    Log.destroy(query)
    .then(() => res.status(200).json({message: "Log entry removed!"}))
    .catch((err)=> res.status(500).json({error:err}));
})

module.exports = router;