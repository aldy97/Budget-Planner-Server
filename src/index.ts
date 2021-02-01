// @ts-ignore
import express from 'express';
// @ts-ignore
import bodyParser from 'body-parser';
import router from './router/index';
// @ts-ignore
import cors from 'cors';
import * as constants from './util/constants';
require('dotenv').config();

import db from './db.config';

const app = express();
const port = process.env.PORT || constants.DEFAULT_PORT;

app.use(
  cors({
    credentials: true,
    origin: ['http://localhost:3000', 'https://budget-planner-client.netlify.app'],
  })
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

db.connect();

app.use('/', router);

app.listen(port, () => {
  console.log(`server is running on ${port}`);
});
