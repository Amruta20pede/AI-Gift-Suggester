import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';

import connectDB from './mongodb/connect.js';
import ArtworkRoute from './routes/ArtworkRoute.js';
import ArtworkPostRoute from './routes/Artwork-PostRoute.js';
import GiftSuggesterRoute from './routes/GiftSuggesterRoute.js';
import PoemGeneratorRoute from './routes/PoemGeneratorRoute.js';
import serapiRoute from './routes/serapiRoute.js';
import GetProduct from './routes/GetProduct.js';

dotenv.config();

const app=express();
app.use(cors());
app.use(express.json()); // Body parsing middleware
app.use(express.urlencoded({ extended: true })); 

app.use('/api/v1/artwork',ArtworkRoute);
app.use('/api/v1/artwork_post',ArtworkPostRoute);
app.use('/api/v1/gift_suggester',GiftSuggesterRoute);
app.use('/api/v1/poem_generater',PoemGeneratorRoute);
app.use('/api/v1/search_product',serapiRoute);
app.use('/api/v1/product',GetProduct);


app.get('/',async(req,res)=>{
    res.send('Hello from AI!');
})

const startServer=async() =>{
    
    try{
        connectDB(process.env.MONGODB_URL);
        app.listen(8000,() => 
        console.log('Server has started on port http://localhost:8000'))
    } catch (error){
        console.log(error);
    }


    
}
startServer();