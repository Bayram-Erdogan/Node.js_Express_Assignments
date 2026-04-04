import {
  listAllCats,
  findCatById,
  addCat,
  modifyCat,
  removeCat,
  findCatsByUserId,
} from '../models/cat-model.js';

export const getAllCats = async (req, res) => {
  try {
    const cats = await listAllCats();
    res.status(200).json(cats);
  } catch (err) {
    res.status(500).json({error: err.message});
  }
};

export const getCatById = async (req, res) => {
  try {
    const cat = await findCatById(req.params.id);
    if (!cat) return res.status(404).json({message: 'Cat not found'});
    res.status(200).json(cat);
  } catch (err) {
    res.status(500).json({error: err.message});
  }
};

export const getCatsByUserId = async (req, res) => {
  try {
    const cats = await findCatsByUserId(req.params.id);
    res.status(200).json(cats);
  } catch (err) {
    res.status(500).json({error: err.message});
  }
};

export const createCat = async (req, res) => {
  try {
    const catData = {...req.body, filename: req.file?.filename || ''};
    const newCat = await addCat(catData);
    res.status(201).json(newCat);
  } catch (err) {
    res.status(500).json({error: err.message});
  }
};

export const updateCat = async (req, res) => {
  try {
    const currentUser = res.locals.user;
    if (!currentUser) return res.sendStatus(401);

    const success = await modifyCat(req.body, req.params.id, currentUser);
    if (!success) return res.status(404).json({message: 'Cat not found'});
    res.status(200).json({message: 'Cat updated'});
  } catch (err) {
    res.status(500).json({error: err.message});
  }
};

export const deleteCat = async (req, res) => {
  try {
    const currentUser = res.locals.user;
    if (!currentUser) return res.sendStatus(401);

    const success = await removeCat(req.params.id, currentUser);
    if (!success) return res.status(404).json({message: 'Cat not found'});
    res.status(200).json({message: 'Cat deleted'});
  } catch (err) {
    res.status(500).json({error: err.message});
  }
};
