const { Router } = require('express');
const readFile = require('../helpers/readFile');

const talkerRouter = Router();

talkerRouter.get('/', async (req, res) => {
    try {
        const data = await readFile();
        if (data.length > 1) return res.status(200).json(data);
        return res.status(200).json([]);
    } catch (Error) {
        return res.status(404).end();
    }
   });

   talkerRouter.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const data = await readFile();
        const findingId = data.find((person) => Number(person.id) === Number(id));

        if (findingId) {
            return res.status(200).json(findingId);
        }
        return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
    } catch (error) {
        return res.status(400).end();
    }
   });

module.exports = talkerRouter;