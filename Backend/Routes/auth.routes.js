const express = require('express');
const router = express.Router();
const { registerUser, loginUser, logoutUser, getMe, forgotPassword, resetPassword } = require('../Controllers/auth.controller');
const { authMiddleware, optionalAuthMiddleware } = require('../Middleware/auth.middleware');

/**
 * @name register
 * @description Register a new user
 * @route POST /api/auth/register
 * @access Public
 */
router.post('/register', registerUser);
/**
 * @name login
 * @description Login a user
 * @route POST /api/auth/login
 * @access Public
 */
router.post('/login', loginUser);
/**
 * @name logout
 * @description Logout a user
 * @route GET /api/auth/logout
 * @access Public
 */
router.post('/logout', logoutUser);

/**
 * @name getMe
 * @description Get the logged in user
 * @route GET /api/auth/getme
 * @access Private
 */
router.get('/getme', optionalAuthMiddleware, getMe);

/**
 * @name forgotPassword
 * @description Request a password reset email
 * @route POST /api/auth/forgot-password
 * @access Public
 */
router.post('/forgot-password', forgotPassword);

/**
 * @name resetPassword
 * @description Reset password using token
 * @route POST /api/auth/reset-password/:token
 * @access Public
 */
router.post('/reset-password/:token', resetPassword);

module.exports = router;