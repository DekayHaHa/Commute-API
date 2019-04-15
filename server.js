import express from 'express';
import { preferences } from './fauxPreferences'
import { users } from './fauxUsers'
import { commutes } from './fauxCommutes'
import fetch from 'node-fetch'
import async from 'express-async-await'
import { weatherKey } from './key'

const app = express();
import cors from 'cors';
app.use(express.json());
app.use(cors());

app.locals.users = users;
app.locals.preferences = preferences;
app.locals.commutes = commutes;
app.locals.weather = []

app.listen(3001, () => console.log(`App listening on port 3001!`));

app.post('/api/user', (req, res) => {
  const { users } = app.locals
  const user = users.find(user => user.userName === req.body.name);
  if (!user) {
    return res.status(404).send("WHY WONT THIS WORK???")
  }
  res.status(200).json(user);
})

app.get('/api/user/weather/:id', async (req, res) => {
  const { id } = req.params
  const { users } = app.locals
  const user = users.find(user => user.id == id)
  if (!user) return res.status(404)
  console.log(user)
  const weather = await getWeather(user.lat, user.lng)
  console.log(weather)
  // mach user id to prefrences and return happy or sad path
  res.status(200).json('heyo');
})

app.get('/commute', (req, res) => {
  res.status(200).json(app.locals.commutes[0])
})

app.post('/addUser', async (req, res) => {
  const { lat, lng, zip, email } = req.body
  const { users } = app.locals
  const userCheck = users.find(user => user.email === email)
  if (userCheck) return res.status(401).send("WHY WONT THIS WORK???")
  let coords;
  let userNewCoords;
  // if (!lat && !lng && zip) {
  //   coords = await getLoc(zip)
  //   userNewCoords = {
  //     id: users.length + 1,
  //     ...req.body,
  //     ...coords
  //   }
  // }
  const newUser = {
    id: users.length + 1,
    ...req.body,
  }
  const userToReturn = userNewCoords || newUser
  app.locals.users.push(userToReturn)
  res.status(201).json(users[users.length - 1])
})

app.post('/addPreferences', (req, res) => {
  // check user id for use
  // create new preferences  or return sad path
})

const getWeather = async (lat, lng) => {
  try {
    const response = await fetch(`https://api.darksky.net/forecast/${weatherKey}/${lat},${lng}`)
    // / exclude=currently, minutely, hourly, alerts, flags
    if (!response.ok) {
      throw Error(response.statusText)
    }
    const data = await response.json()
    return await cleanData(data)
  } catch (error) {
    return { message: error }
  }
}

const cleanData = (data) => {
  // console.log(data)
  return {
    current: data.currently,
    daily: data.daily
  }
}
// const getLoc = async (zip) => {
//   const optObj = {
//     method: "GET",
//     headers: { "Content-Type": "application/json" }
//   }
//   console.log(zip)
//   try {
//     const response = await fetch(`https://www.zipcodeapi.com/rest/${na}/info.json/${zip}/degrees`)
//     if (!response.ok) {
//       throw Error(response.statusText)
//     }
//     const data = await response.json()
//     console.log('in fetch', data)
//   } catch (error) {
//     return { message: error }
//   }
// }