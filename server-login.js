const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post('/login', (req, res) => {
    const { email, password } = req.body;
    // Baca data dari data.txt
    if (!fs.existsSync('data.txt')) {
        return res.json({ status: 'error', message: 'Belum ada data user!' });
    }
    const lines = fs.readFileSync('data.txt', 'utf-8').split('\n').filter(Boolean);
    const user = lines.map(line => JSON.parse(line))
        .find(u => u.email === email && u.password === password);
    if (user) {
        res.json({ status: 'ok', message: 'Login berhasil!' });
    } else {
        res.json({ status: 'error', message: 'Email atau password salah!' });
    }
});

app.listen(3001, () => {
    console.log('Server login berjalan di http://localhost:3001');
});