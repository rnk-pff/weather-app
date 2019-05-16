import express from 'express';
import bodyParser from 'body-parser';
import request from 'request';

const app = express();
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => res.render('index'));

const apiKey = 'ad6bbe2f0934af1ed58b7d482eefa436';

app.post('/', (req, res) => {
  const { city } = req.body;
  const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  request(url, (err, response, body) => {
    if (err) {
      res.render('index', { weather: null, error: 'Error, please try again' });
    } else {
      const weather = JSON.parse(body);
      if (weather.main === undefined) {
        res.render('index', { weather: null, error: 'Error, please try again' });
      } else {
        const message = `It's ${weather.main.temp} degrees in ${weather.name}!`;
        res.render('index', { weather: message, error: null });
      }
    }
  });
});

app.listen(3000, () => {
  console.log('Example app listening on port 3000!');
});
