import {getCats, getCat, addCat} from '../models/cat-model.js';

export const getAllCats = (req, res) => {
  res.status(200).json(getCats());
};

export const getCatById = (req, res) => {
  const id = parseInt(req.params.id);
  const cat = getCat(id);
  if (!cat) return res.status(404).json({message: 'Cat not found'});
  res.status(200).json(cat);
};

export const createCat = (req, res) => {
  const newCat = addCat(req.body);
  res.status(201).json(newCat);
};

export const updateCat = (req, res) => {
  res.status(200).json({message: 'Cat item updated.'});
};

export const deleteCat = (req, res) => {
  res.status(200).json({message: 'Cat item deleted.'});
};
