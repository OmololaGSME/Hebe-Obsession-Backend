import { createServer } from 'http';
import app from './app';
import db from './config/db';

const server = createServer(app);
const PORT = process.env.PORT || 3000;

db().then(()=> server.listen(PORT, ()=> console.log(`Server listening on ${ PORT }`)))
.catch(()=> console.error());