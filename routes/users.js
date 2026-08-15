const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/verifyToken');

// Temporary in-memory users list
let users = [];
let nextUserId = 1;

// Apply JWT authentication middleware to all user routes
router.use(verifyToken);

// GET - Get all users
router.get('/', (req, res) => {
    res.status(200).json(users);
});

// POST - Create a new user
router.post('/', (req, res) => {
    const { name, email } = req.body;

    // Validate required fields
    if (!name || !email) {
        return res.status(400).json({
            message: 'Name and email are required'
        });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
        return res.status(400).json({
            message: 'Please provide a valid email address'
        });
    }

    // Check for duplicate email
    const existingUser = users.find(
        user => user.email.toLowerCase() === email.trim().toLowerCase()
    );

    if (existingUser) {
        return res.status(400).json({
            message: 'Email already exists'
        });
    }

    // Create new user
    const newUser = {
        id: nextUserId++,
        name: name.trim(),
        email: email.trim().toLowerCase()
    };

    users.push(newUser);

    res.status(201).json({
        message: 'User created successfully',
        user: newUser
    });
});

// PUT - Update a user
router.put('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const { name, email } = req.body;

    // Validate ID
    if (isNaN(id)) {
        return res.status(400).json({
            message: 'Invalid user ID'
        });
    }

    // Find user
    const user = users.find(user => user.id === id);

    if (!user) {
        return res.status(404).json({
            message: 'User not found'
        });
    }

    // Validate required fields
    if (!name || !email) {
        return res.status(400).json({
            message: 'Name and email are required'
        });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
        return res.status(400).json({
            message: 'Please provide a valid email address'
        });
    }

    // Check for duplicate email
    const duplicateEmail = users.find(
        existingUser =>
            existingUser.email.toLowerCase() === email.trim().toLowerCase() &&
            existingUser.id !== id
    );

    if (duplicateEmail) {
        return res.status(400).json({
            message: 'Email already exists'
        });
    }

    // Update user
    user.name = name.trim();
    user.email = email.trim().toLowerCase();

    res.status(200).json({
        message: 'User updated successfully',
        user: user
    });
});

// DELETE - Delete a user
router.delete('/:id', (req, res) => {
    const id = parseInt(req.params.id);

    // Validate ID
    if (isNaN(id)) {
        return res.status(400).json({
            message: 'Invalid user ID'
        });
    }

    const userIndex = users.findIndex(user => user.id === id);

    if (userIndex === -1) {
        return res.status(404).json({
            message: 'User not found'
        });
    }

    const deletedUser = users.splice(userIndex, 1)[0];

    res.status(200).json({
        message: 'User deleted successfully',
        user: deletedUser
    });
});

module.exports = router;
