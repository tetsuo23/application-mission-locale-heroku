const db = require("../models");
const Categorie = db.categorie;
const User = db.user;

exports.allAccess = (req, res) => {
  res.status(200).send("Public Content.");
};

exports.userBoard = (req, res) => {
  res.status(200).send("User Content.");
};

exports.adminBoard = (req, res) => {
  res.status(200).send("Admin Content.");
};

exports.referentBoard = (req, res) => {
  res.status(200).send("Referent Content.");
};

exports.beneficiaireBoard = (req, res) => {
  res.status(200).send("Beneficiaire Content.");
};

exports.addCategorie = (userId, categorieId) => {
  return User.findByPk(userId)
    .then((user) => {
      if (!user) {
        console.log("User not found!");
        return null;
      }
      return Categorie.findByPk(categorieId).then((categorie) => {
        if (!categorie) {
          console.log("Categorie not found!");
          return null;
        }

        user.addCategorie(categorie);
        console.log(`>> added Categorie id=${categorie.id} to User id=${user.id}`);
        return user;
      });
    })
    .catch((err) => {
      console.log(">> Error while adding Categorie to User: ", err);
    });
};