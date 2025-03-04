const users = require('./routes/users');
const auth = require('./routes/auth');
const cards = require('./routes/cards');
const cors = require('cors');
const express = require('express');
const app = express();
const http = require('http').Server(app);
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/sahar-rest-api', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...'));

app.use(cors());
app.use(express.static('public'));
app.use(express.json());

app.use('/api/users', users);
app.use('/api/auth', auth);
app.use('/api/cards', cards);

app.get('static-html/*', auth, (req,res) => {
  res.sendFile(__dirname + '/public/static-html/index.html')
})

const port = 3000;
http.listen(port, () => console.log(`Listening on port ${port}...`));