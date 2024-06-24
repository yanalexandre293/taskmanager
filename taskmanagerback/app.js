//app.js
const express = require('express');
const cors = require('cors');

const app = express();
const port = 3003;

const userRoutes = require('./routes/userRouter');
const taskRoutes = require('./routes/taskRouter');
const authRoutes = require('./routes/authRouter');

app.use(express.json());
app.use(cors());

app.use('/users', userRoutes);
app.use('/tasks', taskRoutes);
app.use('/auth', authRoutes)

app.get('/status', (req, res) => {
  res.json({ message: 'API is up and running' });
});

app.listen(port, () => console.log(`App listening on port ${port}!`));