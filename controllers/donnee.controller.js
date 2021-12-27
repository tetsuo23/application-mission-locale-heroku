const { user } = require("../models");
const db = require("../models");
const Donnee = db.donnee;
const User = db.user;
const Fin = db.finance;
const Mob = db.mobilite;
const Op = db.Sequelize.Op;

// Create and Save a new Donnee
exports.create = (req, res) => {

  // Create a Donnee
  const donnee = {
    userId: req.body.id,
    // categorieId:req.body.id,
    mois: req.body.mois,
    valeur: req.body.valeur,
    categorieId: req.body.categorieId,
    published: req.body.published ? req.body.published : false
  };

  // Save Donnee in the database
  Donnee.create(donnee)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Donnee."
      });
    });
};
exports.create = (req, res) => {

  // Create a Donnee
  const finance = {
    userId: req.body.id,
    mois: req.body.mois,
    valeur: req.body.valeur,
    // categorieId: req.body.categorieId,
    
  };

  // Save Donnee in the database
  Fin.create(finance)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Donnee."
      });
    });
};
exports.create = (req, res) => {

  // Create a Donnee
  const mobilite = {
    userId: req.body.id,
    mois: req.body.mois,
    valeur: req.body.valeur,
    // categorieId: req.body.categorieId,
    
  };

  // Save Donnee in the database
  Fin.create(mobilite)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Donnee."
      });
    });
};
exports.findAllFin = (req, res) => {
  
  // const mois = req.query.mois;
  // var condition = mois ? { mois: { [Op.like]: `%${mois}%` } } : null;
  Fin.findAll( {
    
    include: [
      'users'
    ],
  })
    .then(data => {
       user.id,
      res.send(data);
      console.log(data)
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving donnees."
      });
    })
};

exports.findAllMob = (req, res) => {
  User.findOne({
    where: {
      userId:req.body.id
    }
  })
    .then(user => {
      Fin.findAll( {
    
        include: [
          'users'
        ],
      })
        .then(data => {
           user.id,
          res.send(data);
          console.log(data)
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while retrieving donnees."
          });
        })
})
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

// Retrieve all Donnees from the database.
exports.findAll = (req, res) => {
  
  // const mois = req.query.mois;
  // var condition = mois ? { mois: { [Op.like]: `%${mois}%` } } : null;
  User.findOne({
    where: {
      identifiant: req.body.id,
      nom: req.body.nom,
      prenom: req.body.prenom
    }
  })
    .then(user => {
      Donnee.findAll( {
        where: { userId: identifiant},
        include: [
          'users', 'categories'
        ],
      })
        .then(data => {
           user.id,
          res.send(data, user.id);
          console.log(data, user.id)
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while retrieving donnees."
          });
        })
    });
};

exports.findAll6 = (req, res) => {
  const id = req.params.categorieId;
  // const mois = req.query.mois;
  // var condition = mois ? { mois: { [Op.like]: `%${mois}%` } } : null;

  Donnee.findAll({
    include: [
      'categories'
    ],
    where: {
      categorieId: '6'
    }
  })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving donnees."
      });
    });
};

exports.findAll4 = (req, res,next) => {
  
 
      
      Donnee.findAll( {
        where: { categorieId: "4"},
        include: [
          'users', 'categories'
        ],
      })
        .then(data => {
           user.id,
          res.send(data);
          console.log(data)
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while retrieving donnees."
          });
        })
      
};

exports.findAll3 = (req, res) => {
  const id = req.params.categorieId;
  // const mois = req.query.mois;
  // var condition = mois ? { mois: { [Op.like]: `%${mois}%` } } : null;

  Donnee.findAll({
    include: [
      'categories'
    ],
    where: {
      categorieId: '3'
    }
  })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving donnees."
      });
    });
};

exports.findAll2 = (req, res) => {
  const id = req.body.id;
  // const mois = req.query.mois;
  // var condition = mois ? { mois: { [Op.like]: `%${mois}%` } } : null;

  Donnee.findAll({
    include: [
      'categories',
      
    ],
    where: {
      categorieId: '2'
    }
  })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving donnees."
      });
    });
};

exports.findAll1 = (req, res) => {
  const id = req.params.categorieId;
  // const mois = req.query.mois;
  // var condition = mois ? { mois: { [Op.like]: `%${mois}%` } } : null;

  Donnee.findAll({
    include: [
      'categories'
    ],
    where: {
      categorieId: '1'
    }
  })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving donnees."
      });
    });
};

exports.findAll5 = (req, res) => {
  const id = req.params.categorieId;
  // const mois = req.query.mois;
  // var condition = mois ? { mois: { [Op.like]: `%${mois}%` } } : null;

  Donnee.findAll({
    include: [
      'categories'
    ],
    where: {
      categorieId: '5'
    }
  })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving donnees."
      });
    });
};



// Find a single Donnee with an id
// exports.findOne = (req, res) => {
//   const id = req.params.id;

//   Donnee.findByPk(id)
//     .then(data => {
//       if (data) {
//         res.send(data);
//       } else {
//         res.status(404).send({
//           message: `Cannot find Donnee with id=${id}.`
//         });
//       }
//     })
//     .catch(err => {
//       res.status(500).send({
//         message: "Error retrieving Donnee with id=" + id
//       });
//     });
// };

exports.findOneCat = (req, res) => {
 
    User.findOne({
      where: {
        nom: req.body.nom,
        prenom:req.body.prenom
      }
    })
    .then(user => {
      res.status(200).send({
        id: user.id,
        nom: user.nom,
        prenom:user.prenom,
        email: user.email,
        roles: authorities,
        accessToken: token
      });
    })
};

// Update a Donnee by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Donnee.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Donnee was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Donnee with id=${id}. Maybe Donnee was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Donnee with id=" + id
      });
    });
};

// Delete a Donnee with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Donnee.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Donnee was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Donnee with id=${id}. Maybe Donnee was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Donnee with id=" + id
      });
    });
};

// Delete all Donnees from the database.
exports.deleteAll = (req, res) => {
  Donnee.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Donnees were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all donnees."
      });
    });
};

// find all published Donnee
exports.findAllPublished = (req, res) => {
  Donnee.findAll({ where: { published: true } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving donnees."
      });
    });
};
