const express = require('express');
const port = 4000;
const app = express();

const db = require('./config/mongoose');
const User = require('./models/user_details');
const expressLayouts = require('express-ejs-layouts');
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const MongoStore = require('connect-mongo')(session);

app.use(expressLayouts);
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

app.use(express.urlencoded({extended: true}));

app.use(express.static('./assets'));
app.set('view engine', 'ejs');
app.set('views', './views');

app.use(session({
    name: 'codeial',
    secret: 'Caesar',
    saveUninitialized: true,
    resave: false,
    cookie: {
        maxAge: (1000*60*100)
    },
    store: new MongoStore({
        mongooseConnection: db,
        autoRemove: 'disabled'
    }, function(err){})
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);

app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));

app.listen(port, function(err){
    if(err){
        console.log('Error occured in starting the server', err);
        return;
    }
    console.log(`Server is running on port: ${port}`);
});
