const { Router } = require('express');
const readFile = require('../helpers/readFile');

const talkerRouter = Router();

talkerRouter.get('/', async (req, res) => {
    try {
        const data = await readFile();
        if (data.length > 1) return res.status(200).json(data);
        return res.status(200).json([]);
    } catch (error) {
        return res.status(404).end();
    }
   });

module.exports = talkerRouter;