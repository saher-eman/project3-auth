const express = require('express');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

app.use(express.json());

app.use('/api/auth', require('./routes/auth'));
app.use('/api', require('./routes/protected'));
app.use('/api/users', require('./routes/users'));

app.listen(process.env.PORT, () => {
  console.log('Server chal raha hai: http://localhost:3000');
});
