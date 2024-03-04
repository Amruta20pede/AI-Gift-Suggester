import {useNavigate} from "react-router-dom";
import giftimage from '../Assests/gift_img.png';
import HOME_CARD from "../component/Home_card.jsx";
import '../pages/Home.css';

const Home= () => {
    
    const navigate =useNavigate();
    console.warn();
    return(
    <>
        <section id="home" className="maincontainer">
            <div className="Container">
                <div className="right-container">
                    <div className="description">
                        <h3> AI  Gift Suggester</h3>
                        <p>Experience the magic of AI-powered gift suggestions and find the perfect gifts for every occasion, making your gifting moments truly magical</p>
                        <button onClick={()=>navigate('/gift-suggestion')} className="Btn" type="submit">Try Now</button>
                    </div>
                </div>

                <div className="left-container">
                    <div className="left-container-img">
                          <img  src={giftimage} alt="gift_img"/>
                          
                    </div>
                </div>
            </div>
        </section>

        <section id="Option" className="Option">
            <div className="Option-content">
                <div className="Heading">
                    <h3> Unlock the Art of Gift-Giving with AI </h3>
                </div>
                <div>
                    <HOME_CARD/>
                </div>
               
            </div>
        </section>
    </>
    )
}
export default Home