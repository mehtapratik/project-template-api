import 'core-js/stable';
import 'regenerator-runtime/runtime';

import express from 'express';
import cors from 'cors';
import { json, urlencoded } from 'body-parser';
import morgan from 'morgan';
import localtunnel from 'localtunnel';

import config from './config';

const app = express();
const portNo = config.server.port;
const ltSubdomain = config.server.ltSubdomain;
const permittedEndpoints = config.server.permittedEndpoints;

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
      localtunnel(portNo, { subdomain: ltSubdomain }, function(err, tunnel) {
         if (err) throw new Error(err);
         console.log(`Listening @ http://localhost:${portNo} & ${tunnel.url}`);
      });
   } else {
      console.log(`Listening @ http://localhost:${portNo}`);
   }
});
