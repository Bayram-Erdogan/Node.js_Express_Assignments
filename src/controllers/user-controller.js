import {
  listAllUsers,
  findUserById,
  addUser,
  modifyUser,
  removeUserWithCats,
} from '../models/user-model.js';

import {findCatsByUserId} from '../models/cat-model.js';
import bcrypt from 'bcrypt';

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
    if (req.body.password) {
      req.body.password = bcrypt.hashSync(req.body.password, 10);
    }
    const newUser = await addUser(req.body);
    res.status(201).json(newUser);
  } catch (err) {
    res.status(500).json({error: err.message});
  }
};

export const updateUser = async (req, res) => {
  try {
    const currentUser = res.locals.user;
    if (!currentUser) return res.sendStatus(401);

    const targetUserId = parseInt(req.params.id, 10);
    if (currentUser.role !== 'admin' && currentUser.user_id !== targetUserId) {
      return res.sendStatus(403);
    }

    if (req.body.password) {
      req.body.password = bcrypt.hashSync(req.body.password, 10);
    }

    const success = await modifyUser(req.body, req.params.id, currentUser);
    if (!success) return res.status(404).json({message: 'User not found'});
    res.status(200).json({message: 'User updated'});
  } catch (err) {
    res.status(500).json({error: err.message});
  }
};

export const deleteUser = async (req, res) => {
  try {
    const currentUser = res.locals.user;
    if (!currentUser) return res.sendStatus(401);

    const targetUserId = parseInt(req.params.id, 10);
    if (currentUser.role !== 'admin' && currentUser.user_id !== targetUserId) {
      return res.sendStatus(403);
    }

    const success = await removeUserWithCats(req.params.id, currentUser);
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
