const express = require('express')
const router = express.Router()


//Rute Pertama
router.get('/', (req, res, next) =>{
    if(req.cookies.username){
        res.locals.username = req.cookies.username
        res.render("index")    
    }else(
        res.redirect("hello")
    )
})
router.post('/LogOut', (req, res) =>{
    res.clearCookie("username")
    res.redirect("/")
})
router.get('/LogOut', (req, res) =>{
    res.clearCookie("username")
    res.redirect("/")
})

//Rute Hello
router.get('/hello', (req, res) =>{
    if(req.cookies.username){
        res.redirect("/")
    }else{
        console.dir(req.cookies)
        res.render("hello")
    }
})
// //Rute post Hello
// // router.post('/hello', (req, res) =>{
// //     res.send("Telah Masuk")
// // })
// router.post('/hello', (req, res) =>{
//     res.send(req.body.username)
// })

router.post('/hello', (req, res) =>{
    // res.locals= {
    //     username: req.body.username
    // }
    res.locals = req.body
    res.cookie("username", req.body.username)
    res.redirect("/")
})

module.exports = router