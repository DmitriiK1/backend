const express = require('express');
const users = require('./routes/users');
const cards = require('./routes/cards');

const app = express();

app.use('/users', users);
app.use('/cards', cards);
app.use(express.static('public'));
app.use((req, res) => {
  res.status(404).json({ message: 'Запрашиваемый ресурс не найден' });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
