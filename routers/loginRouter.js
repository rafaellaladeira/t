const { Router } = require('express');
const { randomUUID } = require('crypto');

const loginRouter = Router();

loginRouter.post('/', (req, res) => {
    try {
        const { email, password } = req.body;
        const token = randomUUID().replace(/-/g, '').substring(0, 16);
        if (email && password) return res.status(200).json({ token });
        return res.status(404).end();
    } catch (error) {
        return res.status(400).end();
    }
});

module.exports = loginRouter;