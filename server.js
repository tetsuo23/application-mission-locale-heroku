const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require('path');


const app = express();

var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// ------------------------------------------------------------------------


// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, '../front/public')));

// All other GET requests not handled before will return our React app
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../front/public', 'index.html'));
});

// ------------------------------------------------------------------------

// database
const db = require("./models");
const Role = db.role;
const User = db.user;
const Cate = db.categorie;
const Fin = db.finance;
const Mob = db.mobilite;
const DonneeController = require("./controllers/donnee.controller");
const UserController = require("./controllers/user.controller");
const AuthController = require("./controllers/auth.controller");


//  db.sequelize.sync();
// run();
// force: true will drop the table if it already exists
db.sequelize.sync().then(() => {
  console.log('Drop and Resync Database with { force: true }');
  initial();

});
// run();
// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});

app.get('/api/:prenom', (req,res) => {
  var prenom = req.params.prenom;
  console.log(prenom);
})

// routes
require('./routes/auth.routes')(app);
require('./routes/user.routes')(app);
// require("./app/routes/donnees.routes")(app);
require("./routes/donnee.routes")(app);


// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

function initial() {
  Role.create({
    id: 1,
    name: "user"
  });

  Role.create({
    id: 2,
    name: "referent"
  });

  Role.create({
    id: 3,
    name: "admin"
  });

  Role.create({
    id: 4,
    name: "beneficiaire"
  });

  Cate.create({
    id:1,
    cat:'emploi'
  })

  Cate.create({
    id:2,
    cat:'logement'
  })

  Cate.create({
    id:3,
    cat:'finance'
  })

  Cate.create({
    id:4,
    cat:'citoyennete'
  })

  Cate.create({
    id:5,
    cat:'santé'
  })

  Cate.create({
    id:6,
    cat:'mobilite'
  })

  // Fin.create({})

  

}