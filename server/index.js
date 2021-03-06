const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const db = require('../database/index.js');
const path = require('path');
const port = process.env.PORT || 3003;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/../client/dist'));

// // redirect user to restaurant 1 from homepage
// app.get('/', (req, res) => {
//   res.redirect(`/1`);
// });

// gets data for id endpoint
app.get(`/:id`, (req, res) => {
  res.sendFile(path.join(__dirname, '/../client/dist/index.html'))
})

// dynamic endpoint -> /api/restaurants/14 renders data for restaurant 14.
app.get(`/restaurants/:id`, (req, res) => {
  let id = req.params.id;
  db.getDataForId(id, (err, results) => {
    if (err) {
      console.log('error getting data in server', err);
    }
    res.send(results);
  })
});

app.listen(port, () => {
  console.log(`app listening on port ${port}`)
});