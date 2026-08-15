const express = require('express');
const router = express.Router();

let users = [];

// GET - Get all users
router.get('/', (req, res) => {
    res.json(users);
});

// POST - Create a new user
router.post('/', (req, res) => {
    const { name, email } = req.body;

    if (!name || !email) {
        return res.status(400).json({
            message: 'Name and email are required'
        });
    }

    const existingUser = users.find(user => user.email === email);

    if (existingUser) {
        return res.status(400).json({
            message: 'Email already exists'
        });
    }

    const newUser = {
        id: users.length + 1,
        name,
        email
    };

    users.push(newUser);

    res.status(201).json(newUser);
});

// PUT - Update a user
router.put('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const { name, email } = req.body;

    const user = users.find(user => user.id === id);

    if (!user) {
        return res.status(404).json({
            message: 'User not found'
        });
    }

    if (!name || !email) {
        return res.status(400).json({
            message: 'Name and email are required'
        });
    }

    user.name = name;
    user.email = email;

    res.json(user);
});

// DELETE - Delete a user
router.delete('/:id', (req, res) => {
    const id = parseInt(req.params.id);

    const userIndex = users.findIndex(user => user.id === id);

    if (userIndex === -1) {
        return res.status(404).json({
            message: 'User not found'
        });
    }

    const deletedUser = users.splice(userIndex, 1);

    res.json({
        message: 'User deleted successfully',
        user: deletedUser[0]
    });
});

module.exports = router;
