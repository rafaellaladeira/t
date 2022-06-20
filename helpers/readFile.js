const { readFile } = require('fs').promises;

const readFIle = async () => {
    const response = await readFile('./talker.json', 'utf8');
    const data = JSON.parse(response);
    return data;
};

module.exports = readFIle;