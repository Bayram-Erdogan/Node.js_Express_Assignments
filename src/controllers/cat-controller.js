import {
  listAllCats,
  findCatById,
  addCat,
  modifyCat,
  removeCat,
  findCatsByUserId,
} from '../models/cat-model.js';

export const getAllCats = async (req, res, next) => {
  try {
    const cats = await listAllCats();
    res.status(200).json(cats);
  } catch (err) {
    next(err);
  }
};

export const getCatById = async (req, res, next) => {
  try {
    const cat = await findCatById(req.params.id);
    if (!cat) {
      const error = new Error('Cat not found');
      error.status = 404;
      return next(error);
    }
    res.status(200).json(cat);
  } catch (err) {
    next(err);
  }
};

export const getCatsByUserId = async (req, res, next) => {
  try {
    const cats = await findCatsByUserId(req.params.id);
    res.status(200).json(cats);
  } catch (err) {
    next(err);
  }
};

export const createCat = async (req, res, next) => {
  try {
    if (!req.file) {
      const error = new Error('Invalid or missing file');
      error.status = 400;
      return next(error);
    }

    const catData = {...req.body, filename: req.file?.filename || ''};
    const newCat = await addCat(catData);
    res.status(201).json(newCat);
  } catch (err) {
    next(err);
  }
};

export const updateCat = async (req, res, next) => {
  try {
    const currentUser = res.locals.user;
    if (!currentUser) {
      const error = new Error('Unauthorized');
      error.status = 401;
      return next(error);
    }

    const success = await modifyCat(req.body, req.params.id, currentUser);
    if (!success) {
      const error = new Error('Cat not found');
      error.status = 404;
      return next(error);
    }
    res.status(200).json({message: 'Cat updated'});
  } catch (err) {
    next(err);
  }
};

export const deleteCat = async (req, res, next) => {
  try {
    const currentUser = res.locals.user;
    if (!currentUser) {
      const error = new Error('Unauthorized');
      error.status = 401;
      return next(error);
    }

    const success = await removeCat(req.params.id, currentUser);
    if (!success) {
      const error = new Error('Cat not found');
      error.status = 404;
      return next(error);
    }
    res.status(200).json({message: 'Cat deleted'});
  } catch (err) {
    next(err);
  }
};
