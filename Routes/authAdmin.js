const express = require('express');
const router=express.Router();
const {registerAdmin}=require('../Controller/AdminController');
const {loginAdmin}=require('../Controller/AdminController');


router.post('/admin',registerAdmin);
router.post('/login',loginAdmin);


module.exports=router