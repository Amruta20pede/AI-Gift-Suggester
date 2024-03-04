import React from 'react';
import './App.css';
import { BrowserRouter,Routes,Route} from 'react-router-dom';
import Home from './pages/Home';
import Navbar from './component/Navbar/Navbar';
import Footer from './component/Footer';
import Blog from './component/Blog'
import GiftSuggestion from './pages/GiftSuggester/GiftSuggestion';
import PoemGenerator from './pages/PoemGenerator/PoetryGenerator';
import ImageGenerator from './pages/ImageGenerator/ImageGenerator';
import History from './pages/ImageGenerator/History';
import Product from './pages/GiftSuggester/Product';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Navbar/>
      <Routes>
          <Route  path="/" element={<Home/>}></Route>
          <Route  path="/blog" element={<Blog/>}></Route>
          <Route path="/gift-suggestion" element={<GiftSuggestion />} />
          <Route path="/ArtWork-Generator" element={<ImageGenerator />} />
          <Route path="/history" element={<History/>}></Route>
          <Route path="/Poem-Generator" element={<PoemGenerator />} />
          <Route path="/Products" element={<Product />} />
          
      </Routes>
     
      </BrowserRouter>
      <Footer/>
    </div>
      
  );
}

export default App;
