import express from 'express';
import sequelize from './config/connection.js';

//Server set-up
const app = express();
const PORT = process.env.PORT || 3001;

//formats date in handlebars
import helpers from './utils/helpers.js'

//importing handlebars templating engine
import exphbs from 'express-handlebars';
const hbs = exphbs.create({helpers});
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

//server middleware
app.use(express.json());
app.use(express.urlencoded({extended: true }));

//connecting to static files 
app.use(express.static('public'))

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
sequelize.sync({ force: true }).then(() => {
    app.listen(PORT, () => console.log(`Now Listening on Port ${PORT}`))
});
