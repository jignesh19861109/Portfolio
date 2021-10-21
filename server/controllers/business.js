let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

//Reference to the Model
let Info = require('../models/business');

//Contact List Page
module.exports.displayContactList = (req, res, next) =>{
    Info.find((err, ContactList) => {
        if(err){
            return console.error(err);
        }
        else
        {
           console.log(ContactList);

           res.render('business/list', {title: 'Contact List', ContactList: ContactList});
        }
    });
}

// Add page
module.exports.displayAddPage = (req, res, next) =>{
    res.render('business/add', {title: 'Add Contact'});
}

// Post Create Operation
module.exports.processAddPage = (req, res, next) =>{
    let newContact = {
        "firstname": req.body.firstname,
        "lastname": req.body.lastname,
        "email": req.body.email,
        "contact": req.body.contact
    };

    Info.create(newContact, (err) =>{
        if(err){
            console.log(err);
            res.end(err);
        }
        else{
            res.redirect('/list-view');
        }
    });
}

// Display Edit Page

module.exports.displayEditPage = (req, res, next) =>{
    let id = req.params.id;

    Info.findById(id,(err,listToEdit) =>{
        if(err){
            console.log(err);
            res.end(err);
        }
        else{
            res.render('business/edit', {title: 'Edit Contact', list: listToEdit})
        }
    });
}

// Process Edit Page

module.exports.processEditPage = (req, res, next) =>{
    let id = req.params.id

    let updateContact = Info({
        "_id": id,
        "firstname": req.body.firstname,
        "lastname": req.body.lastname,
        "email": req.body.email,
        "contact": req.body.contact
    });

    Info.updateOne({_id: id}, updateContact, (err) =>{
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            res.redirect('/list-view');
        }
    });
}
// Delete Operation
module.exports.performDelete = (req, res, next) =>{
    let id = req.params.id;

    Info.remove({_id:id}, (err) =>{
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            res.redirect('/list-view');
        }
    });
}
