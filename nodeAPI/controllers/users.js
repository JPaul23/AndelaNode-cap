import { v4 as uuidv4 } from "uuid";

let users = [];

export const getUsers = (req, res) => {
  res.send(users);
};

export const createUser = (req, res) => {
  const user = req.body;
  //users with ids
  users.push({ ...user, id: uuidv4() });

  res.send(`user with name ${user.firstname} added to the Database`);
};

export const getUser = (req, res) => {
  const { id } = req.params;

  const foundUser = users.find((user) => user.id == id);

  res.send(foundUser);
};

export const deleteUser = (req, res) => {
  const { id } = req.params;

  users = users.filter((user) => user.id != id);

  res.send(`user with id: ${id} deleted from Db.`);
};

export const updateUser = (req, res) => {
  const { id } = req.params;
  const user = users.find((user) => user.id === id); //finding user with the id

  const { firstname, lastname, age } = req.body;

  if (firstname) user.firstname = firstname;
  if (lastname) user.lastname = lastname;
  if (age) user.age = age;

  res.send(`user with the id: ${id} has been updated`);
};
