import express from 'express';
const app = express();
import cors from 'cors';
app.use(express.json());
app.use(cors());

app.locals.users = [{ userName: 'David', id: 1 }];
app.locals.preferences = [{}, {}];

app.listen(3001, () => console.log(`App listening on port 3001!`));

app.get('/signin', (req, res) => {
  // match username and password and return happy or sad path
  res.status(200).json(app.locals.users[0]);
})

app.get('/preferences', (req, res) => {
  // mach user id to prefrences and return happy or sad path
})

app.post('/newUser', (req, res) => {
  // check username and password for use
  // create new user or return sad path
})

app.post('/addPreferences', (req, res) => {
  // check user id for use
  // create new preferences  or return sad path
})