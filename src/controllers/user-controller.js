import {getUsers, getUser, addUser} from '../models/user-model.js';

export const getAllUsers = (req, res) => {
  res.status(200).json(getUsers());
};

export const getUserById = (req, res) => {
  const id = parseInt(req.params.id);
  const user = getUser(id);
  if (!user) return res.status(404).json({message: 'User not found'});
  res.status(200).json(user);
};

export const createUser = (req, res) => {
  const newUser = addUser(req.body);
  res.status(201).json(newUser);
};

export const updateUser = (req, res) => {
  res.status(200).json({message: 'User item updated.'});
};

export const deleteUser = (req, res) => {
  res.status(200).json({message: 'User item deleted.'});
};
