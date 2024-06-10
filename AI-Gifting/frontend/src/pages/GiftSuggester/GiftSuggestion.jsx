import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import './GiftSuggestion.css';

function GiftSuggester() {
  const [age, setAge] = useState('');
  const [budget, setBudget] = useState('');
  const [relationship, setRelationship] = useState('');
  const [occasion, setOccasion] = useState('');
  const [interests, setInterests] = useState('');
  const [suggestions, setSuggestions] = useState('');
  const navigate = useNavigate();

  const handleGenerateSuggestions = async () => {
    try {
      const prompt = `Suggest gifts for a ${age}-year-old friend for ${occasion} who likes ${interests} with a budget of Rs. ${budget}.`;

      const response = await fetch("http://localhost:8000/api/v1/gift_suggester", {
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
          setSuggestions(parsedSuggestions.message.content);
        } else {
          setSuggestions('');
        }
      }
    } catch (error) {
      console.error('Error generating gift suggestions:', error);
    }
  };

  return (
    <div className="main-container">
      <div className="container">
        <div className='heading'>
          <h1>AI Curated <span>Gift Ideas</span></h1>
          <p className='sub-heading'>Our AI-powered tool will guide you in choosing the perfect gift when you're unsure about what to buy. Simply fill out the form below with information about the recipient and your budget, and we'll suggest a curated list of gifts!</p>
        </div>
        <div className='details'>
          <form className='form'>
            <div className='form-details'>
              <div className='row-details'>
                <div className='row'>
                  <label className="form-label">🤝 I'm Looking for a gift for my</label>
                  <input type="text" value={relationship} onChange={(e) => setRelationship(e.target.value)} className="form-control" id="relationship" name="relationship" placeholder="Type your Relationship" required />
                </div>

                <div className='row'>
                  <label className="form-label"> 👩 With an Age of</label>
                  <input type="number" value={age} onChange={(e) => setAge(e.target.value)} className="form-control" id="age" name="age" placeholder="Age is" required />
                </div>

                <div className='row'>
                  <label className="form-label"> 🌟 On Special day</label>
                  <input type="text" value={occasion} onChange={(e) => setOccasion(e.target.value)} className="form-control" id="occasion" name="occasion" placeholder="Occasion" required />
                </div>

                <div className='row'>
                  <label className="form-label"> ❤️ and Loves (To)</label>
                  <input type="text" value={interests} onChange={(e) => setInterests(e.target.value)} className="form-control" id="interests" name="interests" placeholder="Write hobby or interest" required />
                </div>
                <div className='row'>
                  <label className="form-label">💰 having Budget </label>
                  <input type="text" value={budget} onChange={(e) => setBudget(e.target.value)} className="form-control" id="budget" name="budget" placeholder="Budget is" required />
                </div>
              </div>
            </div>
            <hr className="my-4"></hr>
            <button onClick={handleGenerateSuggestions} className="btn-4" type="button">Get gift suggestions</button>
            <hr className="my-4"></hr>
            <button onClick={() => navigate('/products')} className="Btn" type="button">Get Products</button>
          </form>
        </div>
      </div>
      {suggestions && (
        <div>
          <h2>Gift Suggestions:</h2>
          {suggestions.split('\n').map((suggestion, index) => (
          <p key={index}>{suggestion}</p>
          ))}
        </div>
      )}
    </div>
  );
}

export default GiftSuggester;
