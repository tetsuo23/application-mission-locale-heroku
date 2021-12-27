module.exports = (sequelize, Sequelize) => {
    const Post = sequelize.define("posts", {
      categorie: {
          type : Sequelize.STRING
      },
      mois: {
        type: Sequelize.STRING
      },
      userId: {
        type: Sequelize.STRING
      },
      valeur: {
        type: Sequelize.INTEGER
      }
    });
  
    return Post;
  };