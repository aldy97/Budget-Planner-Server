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

app.use(
  cors({
    credentials: true,
    origin: ['http://localhost:3000'],
  })
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

db.connect();

app.use('/', router);

app.listen(process.env.PORT || constants.DEFAULT_PORT, () => {
  console.log(`server is running on ${process.env.PORT || constants.DEFAULT_PORT}`);
});
