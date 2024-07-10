import { createServer } from 'http';
import app from './app';

const server = createServer(app);
const PORT = process.env.PORT || 3000;

server.listen(PORT, ()=> console.log(`Server listening on ${ PORT }`));