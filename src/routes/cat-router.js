import express from 'express';
import {body} from 'express-validator';
import {
  getAllCats,
  getCatById,
  createCat,
  updateCat,
  deleteCat,
  getCatsByUserId,
} from '../controllers/cat-controller.js';
import {validationErrors} from '../middlewares/error-handlers.js';
import {upload, createThumbnail} from '../middlewares/upload.js';
import {authenticateToken} from '../middlewares/authentication.js';

const router = express.Router();

router.get('/', getAllCats);
router.get('/:id', getCatById);
router.get('/user/:id', getCatsByUserId);
router.post(
  '/',
  upload.single('file'),
  body('cat_name')
    .trim()
    .isLength({min: 3, max: 50})
    .withMessage('must be 3-50 characters')
    .escape(),
  body('weight').trim().isFloat({min: 0.1}).withMessage('must be a number'),
  body('owner')
    .trim()
    .isInt({min: 1})
    .withMessage('must be a positive integer')
    .toInt(),
  body('birthdate')
    .trim()
    .isISO8601()
    .withMessage('must be a valid date (ISO 8601)'),
  validationErrors,
  createThumbnail,
  createCat
);
router.put(
  '/:id',
  authenticateToken,
  body('cat_name')
    .optional()
    .trim()
    .isLength({min: 3, max: 50})
    .withMessage('must be 3-50 characters')
    .escape(),
  body('weight')
    .optional()
    .trim()
    .isFloat({min: 0.1})
    .withMessage('must be a number'),
  body('owner')
    .optional()
    .trim()
    .isInt({min: 1})
    .withMessage('must be a positive integer')
    .toInt(),
  body('birthdate')
    .optional()
    .trim()
    .isISO8601()
    .withMessage('must be a valid date (ISO 8601)'),
  validationErrors,
  updateCat
);
router.delete('/:id', authenticateToken, deleteCat);

export default router;
