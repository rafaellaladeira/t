const readFile = require('../helpers/readFile');

const searchValidation = async (req, res, next) => {
    const nameSearch = req.query.q;
    const data = await readFile();
    const searchInput = data.filter((person) => person.name.includes(nameSearch));
    if (!nameSearch || nameSearch.length === 0) return res.status(200).json(data);
    if (!searchInput) return res.status(200).json([]);

    return next();
};

module.exports = searchValidation;