const express = require('express');
const verifyToken = require('../middleware/verifyToken');
const router = express.Router();
router.get('/dashboard', verifyToken, (req, res) => {
  res.json({ message: 'Welcome ' + req.user.email });
});
module.exports = router;
