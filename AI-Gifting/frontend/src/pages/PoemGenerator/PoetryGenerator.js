import React, { useState } from 'react';
import axios from 'axios';
import './PoetryGenerator.css';

const PoetryGenerator = () => {
  const [topic, setTopic] = useState('');
  const [language, setLanguage] = useState('');
  const [relation, setRelation] = useState('');
  const [uniqueQualities, setUniqueQualities] = useState('');
  const [poetry, setPoetry] = useState('');
  

  const generatePoetry = async () => {
  try {
    const prompt = `Please write a heartfelt poem on ${topic} in ${language} and that I can gift to ${relation}. The poem should convey deep emotions, such as love, gratitude, or admiration, and capture the essence of ${uniqueQualities}. Make it a beautiful and memorable gift that will touch their heart and make them feel truly special .`;

    const response = await fetch("http://localhost:8000/api/v1/poem_generater", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt
      }),
    });

    if (!response.ok) {
      throw new Error(`API request failed with status: ${response.status}`);
    }

    const data = await response.json();
    if (data.suggestions) {
      const parsedSuggestions = JSON.parse(data.suggestions);
      if (parsedSuggestions.message && parsedSuggestions.message.content) {
        setPoetry(parsedSuggestions.message.content);
      } else {
        setPoetry('');
      }
    }
  } catch (error) {
    console.error('Error in  generating Poem:', error);
  }
};
  return (
    <div className="main-container">
      <div className="container">
        <div className='heading'>
          <h1>AI Generated <span>Poems</span></h1>
          <p className='sub-heading'> Our AI-powered tool will generate poem with the give information in your language . Simply fill out the form below with information about the recipient and we'll generate a poem for your loved ones!</p>
        </div>
        <div className='details'>
          <form className='form'>
            <div className='form-details'>
              <div className='row-details'>
                <div className='row'>
                  <label className="form-label">🤝 Generate Poem for my </label>
                  <input type="text" placeholder="recipient's name or relation " value={relation} onChange={(e) => setRelation(e.target.value)} className="form-control" id="relation" name="relation" required />
                </div>

                <div className='row'>
                  <label className="form-label"> 🌟 Specially on</label>
                  <input type="text" placeholder="specific topic or theme" value={topic} onChange={(e) => setTopic(e.target.value)} className="form-control" id="topic" name="topic" required />
                </div>

                <div className='row'>
                  <label className="form-label"> 🗣️in Language</label>
                  <input type="text" placeholder="language " value={language} onChange={(e) => setLanguage(e.target.value)} className="form-control" id="language" name="language" required />
                </div>

                <div className='row'>
                  <label className="form-label">❤️ and Loves (To)</label>
                  <input type="text" placeholder="recipient's unique qualities or the significance of the occasion" value={uniqueQualities} onChange={(e) => setUniqueQualities(e.target.value)} className="form-control" id="uniqueQualities" name="uniqueQualities" required />
                </div>
              </div>
            </div>
            <hr className="my-btn"></hr>
            <button onClick={generatePoetry} className="bttn-4" type="button">Generate Poetry</button>
            
          </form>
        </div>
      </div>
      {poetry && (
        <div>
          <h2>Here is your Poem:</h2>
          <pre className="poem">{poetry}</pre>
        </div>
      )}
    </div>
  );
};

export default PoetryGenerator;
