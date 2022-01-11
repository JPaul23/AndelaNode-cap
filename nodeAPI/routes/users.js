import express from "express";
import { v4 as uuidv4 } from "uuid";

const router = express.Router();

const users = [];

//all routes here start with /users
router.get("/", (req, res) => {
  res.send(users);
});

router.post("/", (req, res) => {
  const user = req.body;
  //users with ids
  users.push({ ...user, id: uuidv4() });

  res.send(`user with name ${user.firstname} added to the Database`);
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  const foundUser = users.find((user) => user.id == id);

  res.send(foundUser);
});

export default router;
