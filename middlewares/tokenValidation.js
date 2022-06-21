const tokenValidation = (req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization) return res.status(401).json({ message: 'Token não encontrado' });
    if (authorization.length !== 16) return res.status(401).json({ message: 'Token inválido' });
    return next();
};

const nameValidation = (req, res, next) => {
    const { name } = req.body;
    if (!name || name.length === 0) {
        return res.status(400).json({ message: 'O campo "name" é obrigatório' });
    }
    if (name.length < 3) {
        return res.status(400).json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
    }
    return next();
};

const ageValidation = (req, res, next) => {
    const { age } = req.body;
    if (!age || age.length === 0) {
        return res.status(400).json({ message: 'O campo "age" é obrigatório' });
    }
    if (age < 18) {
        return res.status(400).json({ message: 'A pessoa palestrante deve ser maior de idade' });
    }
    return next();
};

const talkValidation = (req, res, next) => {
    const { talk } = req.body;
    if (!talk) {
        return res.status(400).json({ message: 'O campo "talk" é obrigatório' });
    }
    return next();
};
const talkWatchedValidation = (req, res, next) => {
    const { talk } = req.body;
    const dateRegex = /(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)\d\d/;
    
    if (!talk.watchedAt) {
        return res.status(400).json({ message: 'O campo "watchedAt" é obrigatório' });
    }
    if (!talk.watchedAt.match(dateRegex)) {
        return res.status(400)
            .json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
    }
    return next();
};

const talkRateValidation = (req, res, next) => {
    const { talk: { rate } } = req.body;
    if (rate < 1 || rate > 5) {
        return res.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
    }
    if (!rate) {
        return res.status(400).json({ message: 'O campo "rate" é obrigatório' });
    }
    return next();
};

module.exports = {
    tokenValidation,
    nameValidation,
    ageValidation,
    talkWatchedValidation,
    talkRateValidation,
    talkValidation,
};