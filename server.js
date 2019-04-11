import express from 'express';
import { preferences } from './fauxPreferences'
import { users } from './fauxUsers'
import { commutes } from './fauxCommutes'
const app = express();
import cors from 'cors';
app.use(express.json());
app.use(cors());

app.locals.users = users;
app.locals.preferences = preferences;
app.locals.preferences = commutes;

app.listen(3001, () => console.log(`App listening on port 3001!`));

app.post('/user', (req, res) => {
  // match username and password and return happy or sad path
  res.status(200).json(app.locals.users[0]);
})

app.get('/preferences/:id', (req, res) => {
  // mach user id to prefrences and return happy or sad path
  res.status(200).json(app.locals.preferences[0]);
})

app.get('/commute/:id', (req, res) => {
  res.status(200).json(app.locals.commutes[0])
})

app.post('/newUser', (req, res) => {
  // check username and password for use
  // create new user or return sad path
})

app.post('/addPreferences', (req, res) => {
  // check user id for use
  // create new preferences  or return sad path
})