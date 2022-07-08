import express from 'express';
import sequelize from './config/connection.js';

//Server set-up
const app = express();
const PORT = process.env.PORT || 3001;


//importing handlebars templating engine
import expressHandlebars  from 'express-handlebars';
const hbs = expressHandlebars.create();
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

//connecting to static files 
app.use(express.static('public'))

//server middleware
app.use(express.json());
app.use(express.urlencoded({extended: true }));

//sessions set-up
import expressSession from 'express-session';
import SequelizeStore from 'connect-session-sequelize';
var sequelizestore = SequelizeStore(expressSession.Store);

const sess = {
    secret: 'Super secret secret',
    cookie: {},
    resave: false,
    saveUninitialized: true,
    store: new sequelizestore({
        db: sequelize
    })
};

app.use(expressSession(sess));

//turning on routes
import controllers from './controllers/index.js'
app.use(controllers)

//turn on connection to db and server
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log(`Now Listening on Port ${PORT}`))
});
