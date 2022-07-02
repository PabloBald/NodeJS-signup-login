const express = require('express')
const router = express.Router()
const passport = require('passport')

router.get('/signup',(req,res)=>{
    res.render('auth/signup')
})

router.post('/signup',passport.authenticate('local.signup',{
    successRedirect:'/profile',
    failureRedirect:'/signup'
}))

router.get('/login',(req,res)=>{
    res.render('auth/login')
})

router.post('/login',passport.authenticate('local.login',{
    successRedirect:'/profile',
    failureRedirect:'/login',
    failureFlash:true
}))

router.get('/profile',(req,res)=>{
    res.send('Profile')
})


module.exports = router;