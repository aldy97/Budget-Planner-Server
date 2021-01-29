import express from 'express';
import bodyParser from 'body-parser';
import router from './router/index';
import cors from 'cors';
import * as constants from './util/constants';

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

app.listen(constants.DEFAULT_PORT, () => {
  console.log(`server is running on ${constants.DEFAULT_PORT}`);
});
