import { createServer } from 'http';
import app from './app';
import db from './config/db';
import job from './service/cronJob';

const server = createServer(app);
const PORT = process.env.PORT || 3000;

job()

db().then(()=> server.listen(PORT, ()=> console.log(`Server listening on port ${ PORT }`)))
.catch(()=> console.error());