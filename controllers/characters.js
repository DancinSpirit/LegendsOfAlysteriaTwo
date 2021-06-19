const db = require('../models');

const index = (req,res) =>{
    db.Character.find({}, (err, characterList) =>{
        if(err) console.log("Error involving character index route!", err);
        res.status(200).json(characterList);
    })
}
const show = (req,res) =>{
    db.Character.findById(req.params.id, (err, foundCharacter) =>{
        if(err) console.log("Error involving character show route!", err);
        res.status(200).json(foundCharacter);
    })
}
const create = (req,res) =>{
    db.Character.create(req.body, (err, newCharacter) =>{
        if(err) console.log("Error involving character create route!", err);
        res.status(201).json(newCharacter);
    })
}
const update = (req,res) =>{
    db.Character.findByIdAndUpdate(req.params.id, req.body,{new:true},(err, updatedCharacter) =>{
        if(err) console.log("Error involving character update route!", err);
        res.status(200).json(updatedCharacter);
    })
}
const destroy = (req,res) =>{
    db.Character.findByIdAndDelete(req.params.id, (err, deletedCharacter) =>{
        if(err) console.log("Error involving character destroy route!", err);
        res.status(200).json(deletedCharacter);
    })
}

module.exports = {
    index,
    show,
    create,
    update,
    destroy
}