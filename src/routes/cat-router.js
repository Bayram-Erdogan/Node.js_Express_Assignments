import express from 'express';
import multer from 'multer';

import {
  getAllCats,
  getCatById,
  postCat,
  updateCat,
  deleteCat,
} from '../controllers/cat-controller.js';

const router = express.Router();

const upload = multer({dest: 'uploads/'});

router.get('/', getAllCats);
router.get('/:id', getCatById);
router.post('/', upload.single('cat'), postCat);
router.put('/:id', updateCat);
router.delete('/:id', deleteCat);

export default router;
