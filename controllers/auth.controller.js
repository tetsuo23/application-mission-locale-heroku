const db = require("../models");
const config = require("../config/auth.config");
const User = db.user;
const Role = db.role;
const Categories = db.categories;


const Op = db.Sequelize.Op;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = (req, res) => {
  // Save User to Database
  User.create({
    nom: req.body.nom,
    prenom: req.body.prenom,
    telephone: req.body.telephone,
    datedenaissance: req.body.datedenaissance,
    adresse: req.body.adresse,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8)
  })
    .then(user => {
      if (req.body.roles) {
        Role.findAll({
          where: {
            name: {
              [Op.or]: req.body.roles
            }
          }
        }).then(roles => {
          user.setRoles(roles).then(() => {
            res.send({ message: "Enregistrement utilisateur réussi !!" });
          });
        });
      } else {
        // user role = 1
        user.setRoles([4]).then(() => {
          res.send({ message: "Enregistrement utilisateur réussi !" });
        });
      }
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

exports.signin = (req, res) => {
  User.findOne({
    where: {
      nom: req.body.nom,
      prenom:req.body.prenom
    }
  })
    .then(user => {
      // if (!user) {
      //   return res.status(404).send({ message: "Utilisateur inconnu" });
      // }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Mot de passe invalide !"
        });
      }

      var token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400 // 24 hours
      });

      var authorities = [];
      user.getRoles().then(roles => {
        for (let i = 0; i < roles.length; i++) {
          authorities.push(roles[i].name.toUpperCase());
        }
        res.status(200).send({
          id: user.id,
          nom: user.nom,
          prenom:user.prenom,
          email: user.email,
          datedenaissance: user.datedenaissance,
          telephone:user.telephone,
          adresse:user.adresse,
          password:user.password,
          roles: authorities,
          accessToken: token
        });
        
      });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};
exports.update = (userId) => {
  User.findByPk(userId)
    .then(user => {
      // if (!user) {
      //   return res.status(404).send({ message: "Utilisateur inconnu" });
      // }

      res.status(200).send({
        id: user.id,
        nom: user.nom,
        prenom:user.prenom,
        email: user.email,
        datedenaissance: user.datedenaissance,
        telephone:user.telephone,
        adresse:user.adresse,
        password:user.password,
        roles: authorities,
        accessToken: token
      });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};
exports.addCategories = (userId, categoriesId) => {
  return User.findByPk(userId)
    .then((user) => {
      if (!user) {
        console.log("user not found!");
        return null;
      }
      return Categories.findByPk(categoriesId).then((categories) => {
        if (!categories) {
          console.log("categories not found!");
          return null;
        }

        user.addCategories(categories);
        console.log(`>> added categories id=${categories.id} to user id=${user.id}`);
        return user;
      });
    })
    .catch((err) => {
      console.log(">> Error while adding categories to user: ", err);
    });
};