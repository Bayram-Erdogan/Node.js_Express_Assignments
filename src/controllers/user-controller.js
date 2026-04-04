import {
  listAllUsers,
  findUserById,
  addUser,
  modifyUser,
  removeUserWithCats,
} from '../models/user-model.js';

import {findCatsByUserId} from '../models/cat-model.js';

export const getAllUsers = async (req, res) => {
  try {
    const users = await listAllUsers();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({error: err.message});
  }
};

export const getUserById = async (req, res) => {
  try {
    const user = await findUserById(req.params.id);
    if (!user) return res.status(404).json({message: 'User not found'});
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({error: err.message});
  }
};

export const createUser = async (req, res) => {
  try {
    const newUser = await addUser(req.body);
    res.status(201).json(newUser);
  } catch (err) {
    res.status(500).json({error: err.message});
  }
};

export const updateUser = async (req, res) => {
  try {
    const success = await modifyUser(req.body, req.params.id);
    if (!success) return res.status(404).json({message: 'User not found'});
    res.status(200).json({message: 'User updated'});
  } catch (err) {
    res.status(500).json({error: err.message});
  }
};

export const deleteUser = async (req, res) => {
  try {
    const success = await removeUserWithCats(req.params.id);
    if (!success) return res.status(404).json({message: 'User not found'});
    res.status(200).json({message: 'User and related cats deleted'});
  } catch (err) {
    res.status(500).json({error: err.message});
  }
};

export const getCatsByUserId = async (req, res) => {
  try {
    const userId = parseInt(req.params.id);
    const cats = await findCatsByUserId(userId);
    res.status(200).json(cats);
  } catch (err) {
    res.status(500).json({error: err.message});
  }
};
