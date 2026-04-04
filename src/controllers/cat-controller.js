import {
  addCat,
  getCat,
  getCats,
  updateCatById,
  deleteCatById,
} from '../models/cat-model.js';

export const getAllCats = (req, res) => {
  res.json(getCats());
};

export const getCatById = (req, res) => {
  const id = Number(req.params.id);
  const cat = getCat(id);
  if (!cat) {
    return res.status(404).json({message: 'Cat not found'});
  }
  res.json(cat);
};

export const postCat = (req, res) => {
  console.log('postCat body:', req.body);
  console.log('postCat file:', req.file);

  const newCat = addCat({
    ...req.body,
    filename: req.file?.filename || null,
  });

  res.status(201).json(newCat);
};

// Backward-compatible alias if other files still import createCat
export const createCat = postCat;

export const updateCat = (req, res) => {
  const id = Number(req.params.id);
  const updated = updateCatById(id, req.body);
  if (!updated) {
    return res.status(404).json({message: 'Cat not found'});
  }
  res.json(updated);
};

export const deleteCat = (req, res) => {
  const id = Number(req.params.id);
  const deleted = deleteCatById(id);
  if (!deleted) {
    return res.status(404).json({message: 'Cat not found'});
  }
  res.json({message: 'Cat deleted', cat: deleted});
};
