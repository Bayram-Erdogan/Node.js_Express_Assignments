import express from 'express';
import multer from 'multer';
import path from 'path';
import {
  getAllCats,
  getCatById,
  createCat,
  updateCat,
  deleteCat,
} from '../controllers/cat-controller.js';
import {createThumbnail} from '../middlewares/upload.js';

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const uniqueName = Date.now() + '-' + Math.round(Math.random() * 1e9) + ext;
    cb(null, uniqueName);
  },
});

const upload = multer({storage});

router.get('/', getAllCats);
router.get('/:id', getCatById);
router.post('/', upload.single('cat'), createThumbnail, createCat);
router.put('/:id', updateCat);
router.delete('/:id', deleteCat);

export default router;
