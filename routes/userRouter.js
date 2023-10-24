const express = require('express');
const router = express.Router();

const {
    getAllUsers,
    showCurrentUser,
    updateUser,
    updateUserPassword
} = require('../controllers/userController')

router
  .route('/').get(getAllUsers)

module.exports = router;