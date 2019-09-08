import 'core-js/stable';
import 'regenerator-runtime/runtime';

import express from 'express';
import cors from 'cors';
import { json, urlencoded } from 'body-parser';
import morgan from 'morgan';

import config from './config';
import localtunnel from 'localtunnel';

const app = express();
const portNo = config.port;
const ltSubdomain = config.ltSubdomain;
const permittedEndpoints = config.permittedEndpoints;

app.disable('x-powered-by');

app.use(
   cors({
      origin: (origin, callback) => {
         if (origin && permittedEndpoints.indexOf(origin) === -1) {
            callback(new Error(`Origin not permitted: ${origin}`));
         } else {
            callback(null, true);
         }
      }
   })
);

app.use(json());
app.use(urlencoded({ extended: true }));
app.use(morgan('combined'));

app.get('/', (req, res) => {
   res.send('Hello world!');
});

app.listen(portNo, () => {
   if (ltSubdomain) {
      localtunnel(portNo, { subdomain: ltSubdomain || 'apitest' }, function(err, tunnel) {
         if (err) throw new Error(err);
         console.log(`Listening @ http://localhost:${portNo} & ${tunnel.url}`);
      });
   } else {
      console.log(`Listening @ http://localhost:${portNo}`);
   }
});
