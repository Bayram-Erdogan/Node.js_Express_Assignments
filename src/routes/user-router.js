import express from 'express';
import {body} from 'express-validator';
import {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  getCatsByUserId,
} from '../controllers/user-controller.js';
import {authenticateToken} from '../middlewares/authentication.js';
import {validationErrors} from '../middlewares/error-handlers.js';

const router = express.Router();

router.get('/', getAllUsers);
router.get('/:id', getUserById);
router.post(
  '/',
  body('name').trim().notEmpty().withMessage('is required').escape(),
  body('email')
    .trim()
    .isEmail()
    .withMessage('must be a valid email')
    .normalizeEmail(),
  body('username')
    .trim()
    .isLength({min: 3, max: 20})
    .withMessage('must be 3-20 characters')
    .isAlphanumeric()
    .withMessage('must be alphanumeric'),
  body('password')
    .trim()
    .isLength({min: 8})
    .withMessage('must be at least 8 characters'),
  body('role')
    .optional()
    .trim()
    .isIn(['user', 'admin'])
    .withMessage('must be user or admin'),
  validationErrors,
  createUser
);
router.put(
  '/:id',
  authenticateToken,
  body('name')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('cannot be empty')
    .escape(),
  body('email')
    .optional()
    .trim()
    .isEmail()
    .withMessage('must be a valid email')
    .normalizeEmail(),
  body('username')
    .optional()
    .trim()
    .isLength({min: 3, max: 20})
    .withMessage('must be 3-20 characters')
    .isAlphanumeric()
    .withMessage('must be alphanumeric'),
  body('password')
    .optional()
    .trim()
    .isLength({min: 8})
    .withMessage('must be at least 8 characters'),
  body('role')
    .optional()
    .trim()
    .isIn(['user', 'admin'])
    .withMessage('must be user or admin'),
  validationErrors,
  updateUser
);
router.delete('/:id', authenticateToken, deleteUser);
router.get('/:id/cats', getCatsByUserId);

export default router;
