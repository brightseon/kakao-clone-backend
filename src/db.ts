import mongoose from 'mongoose';

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser : true,
    useFindAndModify : false
});

const db = mongoose.connection;

const handleOpen = () => console.log('✅   Connected on DB');

const handleError = error => console.log(`❌   Error on DB Connection error : `, error);

db.once('open', handleOpen);
db.on('error', handleError);