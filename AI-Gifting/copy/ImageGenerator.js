import React, { useState,useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './ImageGenerator.css';
import Loader from '../../component/Loader/Loader';

//import history from './history'

import artwork from '../../Assests/artwork.jpg';



const ImageGenerator = () => {
   const navigate = useNavigate();

    const[image_url,setImage_url]=useState("/");
    let inputRef=useRef(null);
    const [loading,setLoading]=useState(false);
    
    
    const imageGenerator = async () => {
      if (inputRef.current.value === "") {
        return 0;
      }
      setLoading(true);
    
      
        const response = await fetch("http://localhost:8000/api/v1/artwork", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            prompt: `${inputRef.current.value}`,
          }),
        });
    
        let data=await response.json();
        let data_array=data.data;
        setImage_url(data_array[0].url);
        setLoading(false);
        
    };

    const handleShare = async () => {
      
      const description = inputRef.current.value;
      const imageUrl = image_url;
  
      if (description && imageUrl) {
        
        const sharedArtworkData = {
          description,
          imageUrl,
        };
        try {
          const response = await fetch('http://localhost:8000/api/v1/artwork_post', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(sharedArtworkData),
          });

          await response.json();
          navigate('/History');
        } catch (err) {
          console.log(err);
          alert(err);
        } finally {
          setLoading(false);
        }
      } else {
        alert('Please generate an image with proper details');
      }
    };
    

  return (
  <div className='main-container'>
    <div className='ai-artwork-generator'>
        <div className='header'>
          AI Art-Work <span> Generator</span>
        </div>
        <div className='img-loading'>
           <div className="image">
             <img src={image_url==="/"?artwork:image_url} alt="img"/>
             {loading && <Loader />}
           </div>
           
           <div className='search-box'>
              <input type="text" ref={inputRef} className='search-input'  name='prompt' placeholder='Describe what you want to see'/>
              <div className='generate-btn'onClick={()=>{imageGenerator()}}>Generate</div>
              
            </div>
            <div className='community-share'>
              <p> Once you have created the Art Piece you want, you can share it with others in the community</p>
              <button className='Share-btn' onClick={handleShare} >Share</button>
            </div>
            
        </div>   
    </div>
  </div>
  )
}

export default ImageGenerator