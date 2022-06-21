const loginValidation = (req, res, next) => {
    const { email, password } = req.body;
    if (!email) res.status(400).json({ message: 'O campo "email" é obrigatório' });
    if (!email.match(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/gm)) {
        res.status(400)
        .json({ message: 'O "email" deve ter o formato "email@email.com"' });
    }
    if (!password) res.status(400).json({ message: 'O campo "password" é obrigatório' });
    if (password.length < 6) {
        res.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
    }
    next();
};

module.exports = loginValidation;