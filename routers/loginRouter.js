const { Router } = require('express');
const loginValidation = require('../middlewares/loginValidation');

const loginRouter = Router();

loginRouter.post('/', loginValidation, (req, res) => {
    const { email, password } = req.body;
    const token = Math.random().toString(6).substring(2, 18);
    if (email && password) res.status(200).json({ token });
});

module.exports = loginRouter; 