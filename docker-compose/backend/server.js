import express from 'express';
import morgan from 'morgan';

const app = express();  

app.use(morgan('dev'));
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.get('/health', (req, res) => {
  res.json({ status: 'OK' });
});

app.get('/api/data', (req, res) => {
  const data = {
    message: 'This is some sample data from the backend API.',
  };
  res.json(data);
});

app.get('/api/users', (req, res) => {
  const users = [
    { id: 1, name: 'Alice' },
    { id: 2, name: 'Bob' },
    { id: 3, name: 'Charlie' },
    { id: 4, name: 'David' },
  ];
  res.json(users);
});

app.get("*name", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});