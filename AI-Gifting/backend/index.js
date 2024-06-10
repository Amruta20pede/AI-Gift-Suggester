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
//import downloadimage from './routes/download-image.cjs';

dotenv.config();

const app=express();
// Middleware function
//const middlewareFunction = (req, res, next) => {
    // Middleware logic
//    console.log('Middleware function executed');
 //   next(); // Call next to proceed to the next middleware or route handler
//};

// Register middleware
//app.use(middlewareFunction);
app.use(cors());
app.use(express.json()); // Body parsing middleware
app.use(express.urlencoded({ extended: true })); 

app.use('/api/v1/artwork',ArtworkRoute);
app.use('/api/v1/artwork_post',ArtworkPostRoute);
app.use('/api/v1/gift_suggester',GiftSuggesterRoute);
app.use('/api/v1/poem_generater',PoemGeneratorRoute);
app.use('/api/v1/search_product',serapiRoute);
app.use('/api/v1/product',GetProduct);
//app.use('/api/v1//download-image',downloadimage);

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