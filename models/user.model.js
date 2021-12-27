

module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("users", {
    // userId: {
    //   type: Sequelize.INTEGER,
    //   //  primaryKey: true
    //   // references: {
    //   //   model: 'users',
    //   //   key:"id"
    //   // }
    // },
    nom: {
      type: Sequelize.STRING
    },
    prenom: {
      type: Sequelize.STRING
    },
    telephone: {
      type: Sequelize.STRING
    },
    datedenaissance: {
      type: Sequelize.STRING
    },
    adresse: {
      type: Sequelize.STRING
    },
    email: {
      type: Sequelize.STRING
    },
    password: {
      type: Sequelize.STRING
    }

    // mois: {
    //   type: Sequelize.ENUM(['Janvier', 'Fevrier', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Aout', 'Septembre', 'Octobre', 'Novembre', 'Decembre'])
    // },
    // valeur: {
    //   type: Sequelize.INTEGER
    // }

    // donnees : {
    //   type: Sequelize.STRING,
    //   mobilite :{
    //     septembre : [1,2,3,4,5],
    //     octobre: [1,2,3,4,5]
    //   },
    //   finance : {
    //     septembre : [1,2,3,4,5],
    //     octobre : [1,2,3,4,5]
    //   }
    // }

  });

  return User;
};
