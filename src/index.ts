import dotenv from 'dotenv';
import app from './server';

dotenv.config();

const PORT = process.env.PORT || 4000;

const handleListening = () => {
    console.log(`✅   Listening on : http://localhost:${ PORT }`);
};

app.listen(PORT, handleListening);