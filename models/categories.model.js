module.exports = (sequelize, Sequelize) => {
  const Categories = sequelize.define("categories", {
    cat: {
      type: Sequelize.STRING
    }
  });

  return Categories;
};