// console.log("Hoi Hoi Hoi")
const express = require('express')
const app = express()

const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')

const mainRoutes = require('./routes/index.js')
const cardRoutes = require('./routes/cards.js')

const port = 15678

app.use(bodyParser.urlencoded({extended:false}))
app.use(cookieParser())

//expose static file
app.use('/public', express.static('public'))

//Memasang mesin template
app.set('view engine', 'pug' )

//rutenya 
app.use(mainRoutes)
app.use('/cards', cardRoutes)

// Mengeneralisasi error, jika tidak ada error match
app.use((req, res, next) =>{
    res.locals.status = req.cookies.username
    let errornya = new Error("Erroccuy")
    errornya.status = 404
        next(errornya)
    // res.locals.username = req.cookies.username
})

//error midleWare
app.use((err, req, res, next) =>{
    res.locals.status = err.status
    res.locals.errorMessage = err.message
    res.send(err.message)
})


// app.use((req, res, next) =>{
//     console.log("one")
//     next()
// })

// app.use((req, res, next) =>{
//     console.log("two")
//     res.send("tamat")
// })

// Penanganan Error
// app.get('/', (req, res, next) =>{
//     if(req.cookies.username){
//         let bikinError = new Error ("Gada User Name nya Cuy")
//         next(bikinError)
//     }
//         res.locals.username = req.cookies.username
//         res.render("index")    
//     })


//Rute Pertama
app.get('/', (req, res, next) =>{
    if(req.cookies.username){
        res.locals.username = req.cookies.username
        res.render("index")    
    }else(
        res.redirect("hello")
    )
    // console.log("OI")
    // // res.send("Sampai Nih")
})
app.post('/', (req, res) =>{
    res.clearCookie("username")
    res.redirect("/")
})

//Penmbuatan kata Error di belakang untuk tampilan user
app.use ((err, req, res, next) =>{
    res.locals.statusu = err
})

app.get('/makasihloh',(req, res, next) =>{
    console.log("one")
    next()
})

app.get('/makasihloh',(req, res, next) =>{
    console.log("two")
    res.send("gokil")
})

//Rute Cards
// app.get('/cards', (req, res) =>{
//     //res.locals.variabel = "bla bla bla"
//     // res.locals.hint = "HintsMan"
//     res.locals = {
//         variabel: "Bla bla bla",
//         // hint: "Bla bla bla"
//     // }
//     colors: ["Grey", "Blue", "Red"]
//     }
//     res.render('cards')
//     // res.render("cards", {variabel:"Kabar nya siapa bagaimana ?"})
// })

//Rute Hello
app.get('/hello', (req, res) =>{
    if(req.cookies.username){
        res.redirect("/")
    }else{
        console.dir(req.cookies)
        res.render("hello")
    }
})

// //Rute post Hello
// // app.post('/hello', (req, res) =>{
// //     res.send("Telah Masuk")
// // })
// app.post('/hello', (req, res) =>{
//     res.send(req.body.username)
// })

app.post('/hello', (req, res) =>{
    // res.locals= {
    //     username: req.body.username
    // }
    res.locals = req.body
    res.cookie("username", req.body.username)
    res.redirect("/")
})

app.use((err, req, res, next) =>{
    res.send("Error Cacat Bro")
})


app.listen(port, () => {
    console.log("Nyala")
})   
