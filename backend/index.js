import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cors());

const CONNECTION_URL = 'mongodb+srv://admin:admin@scrummasters-it-project.gtsnj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
const PORT = process.env.PORT || 5000

mongoose.connect(
    CONNECTION_URL, 
    {   useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => app.listen(PORT, () => console.log('MongoDB connected')))
    .catch((error) => console.log(error.message));

mongoose.set('useFindAndModify', false);