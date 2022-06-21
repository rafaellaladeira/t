const { Router } = require('express');

const loginRouter = Router();

loginRouter.post('/', (req, res) => {
    const { email, password } = req.body;
    const token = Math.random().toString(14);
    if (email && password) res.status(200).json({ token });
});

module.exports = loginRouter; 

// const token = toke.replace(/-/g, '').substring(0, 16);