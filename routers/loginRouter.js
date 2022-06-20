const { Router } = require('express');
const { randomUUID } = require('crypto');

const loginRouter = Router();

loginRouter.post('/', (req, res) => {
    const { email, password } = req.body;
    const token = randomUUID().replace(/-/g, '').substring(0, 16);
    if (email && password) return res.status(200).json({ token });
});

module.exports = loginRouter;