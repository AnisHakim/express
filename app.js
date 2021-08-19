const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const app = express();

// var corsOptions = {
//   origin: 'http://localhost:3000',
// };
// app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

//middleWare
function serverAvailableMiddleWare(req, res, next) {
  var currentDate = new Date();
  var currentDateRequest = new Date();
  var Monday = new Date(
    currentDate.setDate(currentDate.getDate() - currentDate.getDay() + 1),
  );
  var Friday = new Date(
    currentDate.setDate(currentDate.getDate() - currentDate.getDay() + 5),
  );
  //The web application is only available during working hours (Monday to Friday,  from 9 to 17).
  if (
    currentDateRequest.getDate() >= Monday.getDate() &&
    currentDateRequest.getDate() <= Friday.getDate() &&
    currentDateRequest.getHours() >= 9 &&
    currentDateRequest.getHours() <= 17
  ) {
    next();
  } else {
    res.send('server closed');
  }
}
app.use(serverAvailableMiddleWare);

//home
app.get('/', (req, res) => {
  fs.readFile('./home.html', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    res.send(data);
  });
});

app.get('/OurServices', (req, res) => {
  fs.readFile('./ourServices.html', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    res.send(data);
  });
});
app.get('/ContactUs', (req, res) => {
  fs.readFile('./contactUs.html', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    res.send(data);
  });
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, console.log(`Server started on port ${PORT}`));
