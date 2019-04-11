import express from 'express';
const app = express();
import cors from 'cors';
app.use(express.json());
app.use(cors());

app.locals.users = { userName: 'David', id: 1 }

app.listen(3001, () => console.log(`App listening on port 3001!`))

app.get('/', (req, res) => res.status(200).json(app.locals.users))