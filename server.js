let express = require('express');
let app = express();
let bodyParser = require("body-parser");
let session = require("express-session");
require('dotenv').config({path: './config/.env'})


// Moteur de template
app.set('view engine', 'ejs')

// Middlewares
app.use('/assets', express.static('public'));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(session({
    secret: 'azerty',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }  // true si https
  }))
  app.use(require('./middlewares/flash'))

// Routes
app.get('/', (request, response)=>{
    let Message = require("./models/message")
    Message.all(function(messages){

        response.render('pages/index', {messages: messages})
    })
    // console.log(request.session);
    // if(request.session.error){
    //     response.locals.error = request.session.error
    //     request.session.error = undefined
    // };
})

app.post("/", (request, response)=>{
    if(request.body.message === undefined || request.body.message === ''){
        // response.render('pages/index', {error: "vous n'avez pas entré de message" })
        request.flash('error', "Vous n'avez pas posté de message !")
        response.redirect('/')
    } else {
        let Message = require("./models/message")
        Message.create(request.body.message, function(){
            request.flash('success', "Merci !")
            response.redirect('/')
        })
    };
})

app.get('/message/:id', (request, response) => {

    let Message = require('./models/message')
    Message.find(request.params.id, function(message){
        response.render('messages/show', {message: message})
    })

})

app.listen(8080)