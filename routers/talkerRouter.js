const { Router } = require('express');
const readFile = require('../helpers/readFile');
const writeFIle = require('../helpers/writeFile');
const searchValidation = require('../middlewares/searchTermValidation');
const { tokenValidation, 
    nameValidation, 
    ageValidation,
    talkWatchedValidation,
    talkRateValidation,
    talkValidation } = require('../middlewares/tokenValidation');

const talkerRouter = Router();

talkerRouter.get('/search', 
    tokenValidation, 
    searchValidation,
    async (req, res) => {
    const nameSearch = req.query.q;
    const data = await readFile();
    const searchInput = data.filter((person) => person.name.includes(nameSearch));
    if (searchInput) {
        return res.status(200).json(searchInput);
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
        console.log(error);
    }
   });

   talkerRouter.put('/:id',
    tokenValidation, 
    nameValidation,
    ageValidation,
    talkValidation,
    talkRateValidation,
    talkWatchedValidation, 
    async (req, res) => {
    const { id } = req.params;
    const { name, age, talk: { watchedAt, rate } } = req.body;
    const data = await readFile();
    const newPerson = data.find((person) => person.id === Number(id));
    console.log(newPerson);
    if (newPerson !== null || newPerson !== undefined) {
        const newValue = { id: newPerson.id, name, age, talk: { watchedAt, rate } };
        writeFIle([newValue]);
        return res.status(200).json(newValue);
    }
    });

talkerRouter.delete('/:id', tokenValidation, async (req, res) => {
    const { id } = req.params;
    const data = await readFile();
    const newPerson = data.findIndex((person) => person.id === Number(id));

    if (newPerson !== -1) {
        const newData = data.slice(newPerson, 1);
        writeFIle(newData);
        return res.status(204).end();
    }
});
talkerRouter.get('/', async (req, res) => {
    try {
        const data = await readFile();
        if (data.length > 1) return res.status(200).json(data);
        return res.status(200).json([]);
    } catch (Error) {
        return res.status(404).end();
    }
   });

   talkerRouter.post('/',
        tokenValidation, 
        nameValidation,
        ageValidation,
        talkValidation,
        talkRateValidation,
        talkWatchedValidation,
        async (req, res) => {
        try {
            const { name, age, talk: { watchedAt, rate } } = req.body;
            const data = await readFile();
            const newData = { id: data.length + 1, name, age, talk: { watchedAt, rate } };
            const allData = [...data, newData];
            writeFIle(allData);
            res.status(201).json(newData);
        } catch (error) {
            res.status(400).end();
        }
   });

module.exports = talkerRouter;