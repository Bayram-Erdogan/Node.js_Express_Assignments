import express from 'express';
import multer from 'multer';
import path from 'path';
import {
  getAllCats,
  getCatById,
  createCat,
  updateCat,
  deleteCat,
  getCatsByUserId,
} from '../controllers/cat-controller.js';
import {createThumbnail} from '../middlewares/upload.js';
import {authenticateToken} from '../middlewares/authentication.js';

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
router.get('/user/:id', getCatsByUserId);
router.post('/', upload.single('cat'), createThumbnail, createCat);
router.put('/:id', authenticateToken, updateCat);
router.delete('/:id', authenticateToken, deleteCat);

export default router;
