import { schedule } from 'node-cron';
import fetch from 'node-fetch';

const job = ()=> {
    schedule('*/10 * * * *', async()=> {
        const response = await fetch('https://hebe-beauty.onrender.com/health-check');
        const data = await response.json()
    })
}

export default job;