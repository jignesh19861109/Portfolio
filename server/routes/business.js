let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

let passport = require('passport');


//connect to our Business Model
//let Info = require('../models/business');

let infoController = require('../controllers/business')

function requireAuth(req, res, next)
{
    if(!req.isAuthenticated())
    {
        return res.redirect('/login');
    }
    next();
}

// Read Operation
router.get('/', infoController.displayContactList);

/* Create Operation  */

router.get('/add', requireAuth, infoController.displayAddPage);

/* Post Create Operation  */


router.post('/add', requireAuth, infoController.processAddPage);
/* Update Operation  */

router.get('/edit/:id', requireAuth, infoController.displayEditPage);

/* Post Update Operation  */

router.post('/edit/:id', requireAuth, infoController.processEditPage);

/* Delete Operation  */
router.get('/delete/:id', requireAuth, infoController.performDelete );


module.exports = router;