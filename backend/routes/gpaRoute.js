const router = require("express").Router();
const gpaModel = require("../models/GPAmodel");

router.get("/", (req, res) => {
  gpaModel
    .find()
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.status(400).json("Error: " + err);
    });
});

router.post("/", (req, res) => {
  const addGPA = new gpaModel({
    title: req.body.title,
    score: req.body.score,
    gpa: req.body.gpa,
  });

  addGPA
    .save()
    .then(() => {
      res.json("saved");
    })
    .catch((err) => {
      res.status(400).json("Error: " + err);
    });
});

router.delete("/:id", (req, res) => {
  const id = req.params.id;
  gpaModel
    .deleteOne({ _id: id })
    .then(() => {
      res.json("Deleted");
    })
    .catch((err) => {
      res.status(400).json("Error: " + err);
    });
});

module.exports = router;
