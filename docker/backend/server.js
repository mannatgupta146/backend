import exxpress from 'express';

const app = exxpress();
const PORT = 3000;

app.get('/', (req, res) => {
  res.status(200).send('Hello World!');
});

app.get('/api/data', (req, res) => {
    const data = {
        id: 1,
        name: 'Sample Data',
        description: 'This is some sample data from the backend.'
    };
  res.status(200).json(data);
});

app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'OK', timestamp: new Date() });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});