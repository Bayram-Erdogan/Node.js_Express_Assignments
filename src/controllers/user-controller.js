import {
  listAllUsers,
  findUserById,
  addUser,
  modifyUser,
  removeUserWithCats,
} from '../models/user-model.js';

import {findCatsByUserId} from '../models/cat-model.js';
import bcrypt from 'bcrypt';

export const getAllUsers = async (req, res, next) => {
  try {
    const users = await listAllUsers();
    res.status(200).json(users);
  } catch (err) {
    next(err);
  }
};

export const getUserById = async (req, res, next) => {
  try {
    const user = await findUserById(req.params.id);
    if (!user) {
      const error = new Error('User not found');
      error.status = 404;
      return next(error);
    }
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};

export const createUser = async (req, res, next) => {
  try {
    if (req.body.password) {
      req.body.password = bcrypt.hashSync(req.body.password, 10);
    }
    const newUser = await addUser(req.body);
    res.status(201).json(newUser);
  } catch (err) {
    next(err);
  }
};

export const updateUser = async (req, res, next) => {
  try {
    const currentUser = res.locals.user;
    if (!currentUser) {
      const error = new Error('Unauthorized');
      error.status = 401;
      return next(error);
    }

    const targetUserId = parseInt(req.params.id, 10);
    if (currentUser.role !== 'admin' && currentUser.user_id !== targetUserId) {
      const error = new Error('Forbidden');
      error.status = 403;
      return next(error);
    }

    if (req.body.password) {
      req.body.password = bcrypt.hashSync(req.body.password, 10);
    }

    const success = await modifyUser(req.body, req.params.id, currentUser);
    if (!success) {
      const error = new Error('User not found');
      error.status = 404;
      return next(error);
    }
    res.status(200).json({message: 'User updated'});
  } catch (err) {
    next(err);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    const currentUser = res.locals.user;
    if (!currentUser) {
      const error = new Error('Unauthorized');
      error.status = 401;
      return next(error);
    }

    const targetUserId = parseInt(req.params.id, 10);
    if (currentUser.role !== 'admin' && currentUser.user_id !== targetUserId) {
      const error = new Error('Forbidden');
      error.status = 403;
      return next(error);
    }

    const success = await removeUserWithCats(req.params.id, currentUser);
    if (!success) {
      const error = new Error('User not found');
      error.status = 404;
      return next(error);
    }
    res.status(200).json({message: 'User and related cats deleted'});
  } catch (err) {
    next(err);
  }
};

export const getCatsByUserId = async (req, res, next) => {
  try {
    const userId = parseInt(req.params.id, 10);
    const cats = await findCatsByUserId(userId);
    res.status(200).json(cats);
  } catch (err) {
    next(err);
  }
};
