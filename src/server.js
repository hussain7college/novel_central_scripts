
import bodyParser from 'body-parser';
import express from 'express';
import './routes.js';
import controller from './controller.js';

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.get('/', (request, response) => {
  response.json({ info: 'Node.js, Express, and Postgres API' });
});

app.post('/novels/', (request, response) => {
  controller.addNovel(request, response);
});

app.get('/novels/', (request, response) => {
  controller.getNovels(request, response);
});

app.delete('/novels/:id', (request, response) => {
  controller.deleteNovel(request, response);
});

app.post('/novels/scan/', (request, response) => {
  controller.scanChapters(request, response);
});

app.get('/novels/', (request, response) => {
  controller.getNovels(request, response);
});




app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});
