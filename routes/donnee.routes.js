module.exports = (app) => {
  const posts = require("../controllers/post.controller");

  const donnees = require("../controllers/donnee.controller");

  var router = require("express").Router();

  // Create a new Donnee
  router.post("/", posts.createPost);
  router.post("/finance", donnees.create);
  router.post("/mobilite", donnees.create);

  // Retrieve a single Tutorial with id
  // router.get("/:id", posts.findOne);

  // Retrieve all Tutorials
  router.get("/:userId/:categorie", posts.findAllUserIdAndCat);
   router.get("/:userId", posts.findAllUserId);
   router.get("/", posts.findAll);

  // ----------------------------------------------------------------------- //

 

  app.use("/api/posts", router);
};
