import React from 'react'
import '../component/Home_card.css'
import { useNavigate } from 'react-router-dom';

const Home_card = () => {
    const card_content= [
        {
          id: 1,
          title: "Personalized Gift Ideas",
          description:
            "Our AI-powered tool will guide you in choosing the perfect gift when you're unsure about what to buy. Give information about the recipient and get gift ideas!",
          
          demo: "/gift-suggestion",
        },
        {
          id: 2,
          title: "AI Generated Art-work",
          description:
            "Tell us want you want and our AI-powered Will generate Amazing Artwork for Art lovers",
          demo: "/ArtWork-Generator",
        },
        {
          id: 3,
          title: "AI Generated Poems",
          description: "Our AI-powered tool will generate poem in your language . Give information about the recipient and we'll generate a poem for your loved ones!",
          
          demo: "/Poem-Generator",
        },
        
      ];

      const navigate = useNavigate();
      const navigateToDemo = (demoLink) => {
      navigate(demoLink);
      };

      return (
        <section id="Card">
          
          <div className="Container Card__container">
            {card_content.map((pro) => (
              <article className="Card__item" key={pro.id}>
                 
                <div className="Card__item-content">
                  <h3>{pro.title}</h3>
                  <p>{pro.description}</p>
                  
                </div>
                <div className="Card__item-cta">
                    <button onClick={() => navigateToDemo(pro.demo)} className="external-link-button">
                       <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-external-link">
                          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                          <polyline points="15 3 21 3 21 9"></polyline>
                          <line x1="10" y1="14" x2="21" y2="3"></line>
                       </svg>
                   </button>
                  
                 
                </div>
              </article>
            ))}
          </div>
        </section>
      );
}

export default Home_card