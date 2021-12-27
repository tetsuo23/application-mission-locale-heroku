const db = require("../models");
const User = db.user;
const Post = db.post;

exports.createPost = (req, res) => {
    // Validate request
    if (!req.body.mois) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
      return;
    }
  

    // Create a Tutorial
    const post = {
      categorie: req.body.categorie,
      mois: req.body.mois,
      valeur: req.body.valeur,
      userId: req.body.userId
    };
  
    // Save Tutorial in the database
    Post.create(post)
      .then(data => {
        res.send(data);
      })
      
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Tutorial."
        });
      });
  };



  exports.findAllUserIdAndCat = (req, res) => {
    const userId = req.params.userId;
    const cat = req.params.categorie;
    Post.findAll({ where: { userId: userId, categorie : cat  } })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving tutorials."
        });
      });
  };
  exports.findAllUserId = (req, res) => {
    const userId = req.params.userId;
    Post.findAll({ where: { userId: userId } })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving tutorials."
        });
      });
  };

  exports.findAll = (req, res) => {
    const mois = req.body.mois;
    
  
    Post.findAll({ where: {mois:mois} })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving tutorials."
        });
      });
  };