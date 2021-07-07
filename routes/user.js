const express = require('express');
const router =  express.Router();
const  userById = require('../controllers/user').userById;
router.get('/secret/:userId',(req,res) => 
{
    res.json({msg:"Found"});
});

router.param("userId",userById);
module.exports = router;