import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import Cards from './dbCards.js';

// App Config
const app = express();
const port = process.env.PORT || 8001
const connection_url = "mongodb+srv://admin:Abhay27@cluster0.lewrk.mongodb.net/tinderDB?retryWrites=true&w=majority"

// Middlewares
app.use(cors({ origin: true }));
app.use(express.json());

// DB config
mongoose.connect(connection_url, {
    useNewUrlParser: true,
    useCreateIndex: true, 
    useUnifiedTopology: true
})

// API Endpoint
app.get('/', (req, res) => res.status(200).send("Hello World!!")); // 200 - ok

app.post('/tinder/card', (req, res) => {
    const dbCards = req.body;
    console.log(dbCards);
    
    Cards.insertMany(dbCards, (err, data) => {
        if(err){
            res.status(500).send(err); // internal server err
        }else{
            res.status(201).send(data); // 201 - created
        }
    })
});

app.get('/tinder/card', (req, res) => {
    Cards.find({}, (err, data) => {
        if(err){
            res.status(500).send(err); // internal server err
        }else{
            res.status(200).send(data); // 200 - ok
        }
    })
})

// Listener

app.listen(port, () => console.log(`listening on localhost: ${port}`))