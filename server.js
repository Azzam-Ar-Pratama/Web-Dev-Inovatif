const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post('/signup', (req, res) => {
    const { nama, email, password } = req.body;
    const data = { nama, email, password };
    fs.appendFileSync('data.txt', JSON.stringify(data) + '\n');
    res.json({ status: 'ok', message: 'Data berhasil disimpan!' });
});