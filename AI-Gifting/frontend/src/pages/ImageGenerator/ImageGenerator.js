import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './ImageGenerator.css';
import Loader from '../../component/Loader/Loader';
import artwork from '../../Assests/artwork.jpg';

const ImageGenerator = () => {
  const navigate = useNavigate();
  const [generatedImageUrl, setGeneratedImageUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const inputRef = useRef(null);

  const imageGenerator = async () => {
    if (inputRef.current.value === "") {
      return 0;
    }
    setLoading(true);

    try {
      const response = await fetch("http://localhost:8000/api/v1/artwork", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: inputRef.current.value,
        }),
      });

      const data = await response.json();
      const imageUrl = data.data[0].url;
      setGeneratedImageUrl(imageUrl);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handleShare = async () => {
    const description = inputRef.current.value;

    if (description && generatedImageUrl) {
      const sharedArtworkData = {
        prompt: description,
        image: generatedImageUrl,
      };

      try {
        const response = await fetch('http://localhost:8000/api/v1/artwork_post', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(sharedArtworkData),
        });

        if (response.ok) {
          navigate('/History');
        } else {
          console.log('Failed to save artwork.');
        }
      } catch (err) {
        console.log(err);
        alert('Failed to save artwork.');
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
            <img src={generatedImageUrl === "" ? artwork : generatedImageUrl} alt="Generated Artwork" />
            {loading && <Loader />}
          </div>
          <div className='search-box'>
            <input type="text" ref={inputRef} className='search-input' name='prompt' placeholder='Describe what you want to see' />
            <div className='generate-btn' onClick={imageGenerator}>Generate</div>
          </div>
          <div className='community-share'>
            <p>Once you have created the Art Piece you want, you can share it with others in the community</p>
            <button className='Share-btn' onClick={handleShare}>Share</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ImageGenerator;

